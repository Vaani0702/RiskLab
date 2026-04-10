"""
Monte Carlo simulation engine for RiskLab.
Runs 1,000 scenarios using numpy for fast computation.
"""

import numpy as np
from typing import Dict, List


def run_monte_carlo(
    investment: float,
    annual_mean: float,
    annual_std: float,
    years: int = 5,
    scenarios: int = 1000,
    seed: int = None
) -> Dict:
    """
    Run Monte Carlo simulation and return structured results.

    Args:
        investment: Starting amount in rupees
        annual_mean: Expected annual return (e.g. 0.12 for 12%)
        annual_std: Annual standard deviation (e.g. 0.18 for 18%)
        years: Number of years to simulate
        scenarios: Number of scenarios to run
        seed: Random seed for reproducibility (optional)

    Returns:
        Dictionary with zones, percentiles, histogram bins, and FD comparison
    """
    if seed is not None:
        np.random.seed(seed)

    weeks_per_year = 52
    total_weeks = years * weeks_per_year

    # Convert annual to weekly parameters
    weekly_mean = annual_mean / weeks_per_year
    weekly_std = annual_std / np.sqrt(weeks_per_year)

    # Generate all random returns at once (fast numpy operation)
    # Shape: (scenarios, total_weeks)
    random_returns = np.random.normal(weekly_mean, weekly_std, (scenarios, total_weeks))

    # Compute final values using cumulative product
    # (1 + r1) * (1 + r2) * ... = exp(sum(log(1+r)))
    log_returns = np.log1p(random_returns)
    cumulative = np.exp(log_returns.sum(axis=1))
    final_values = investment * cumulative

    # Sort for percentile calculations
    sorted_values = np.sort(final_values)

    # FD comparison (6.5% guaranteed, no compounding risk)
    fd_final = investment * ((1 + 0.065) ** years)

    # Zone classification
    green_mask  = final_values > investment                              # made money
    yellow_mask = (final_values >= investment * 0.75) & ~green_mask     # small loss
    red_mask    = final_values < investment * 0.75                      # big loss

    green_count  = int(green_mask.sum())
    yellow_count = int(yellow_mask.sum())
    red_count    = int(red_mask.sum())

    # Percentiles
    p10 = float(np.percentile(sorted_values, 10))
    p25 = float(np.percentile(sorted_values, 25))
    p50 = float(np.percentile(sorted_values, 50))
    p75 = float(np.percentile(sorted_values, 75))
    p90 = float(np.percentile(sorted_values, 90))

    # Histogram bins for distribution chart
    min_val = float(sorted_values[0])
    max_val = float(sorted_values[-1])
    bin_count = 24
    bin_edges = np.linspace(min_val, max_val, bin_count + 1)
    counts, _ = np.histogram(final_values, bins=bin_edges)

    bins = []
    for i in range(bin_count):
        center = (bin_edges[i] + bin_edges[i + 1]) / 2
        bins.append({
            "rangeValue": round(center),
            "label": f"₹{round(center / 1000)}k",
            "count": int(counts[i]),
            "zone": "green" if center > investment else ("yellow" if center >= investment * 0.75 else "red")
        })

    # Year-by-year median path for chart
    yearly_path = []
    for y in range(1, years + 1):
        w = y * weeks_per_year
        partial = np.exp(log_returns[:, :w].sum(axis=1))
        yearly_path.append({
            "year": f"Year {y}",
            "median": round(float(np.median(investment * partial))),
            "p25": round(float(np.percentile(investment * partial, 25))),
            "p75": round(float(np.percentile(investment * partial, 75))),
        })

    return {
        "scenarios": scenarios,
        "years": years,
        "investment": investment,
        "fdFinal": round(fd_final),
        "zones": {
            "green":  {"count": green_count,  "pct": round(green_count  / scenarios * 100, 1)},
            "yellow": {"count": yellow_count, "pct": round(yellow_count / scenarios * 100, 1)},
            "red":    {"count": red_count,    "pct": round(red_count    / scenarios * 100, 1)},
        },
        "percentiles": {
            "p10": round(p10),
            "p25": round(p25),
            "p50": round(p50),
            "p75": round(p75),
            "p90": round(p90),
        },
        "bins": bins,
        "yearlyPath": yearly_path,
        "stats": {
            "mean": round(float(final_values.mean())),
            "std":  round(float(final_values.std())),
            "min":  round(min_val),
            "max":  round(max_val),
        }
    }


def calculate_sip_returns(
    monthly_amount: float,
    annual_return: float,
    years: int
) -> Dict:
    """Calculate SIP returns using the standard formula."""
    monthly_rate = annual_return / 12
    months = years * 12
    total_invested = monthly_amount * months

    if monthly_rate == 0:
        final_value = total_invested
    else:
        final_value = monthly_amount * (
            ((1 + monthly_rate) ** months - 1) / monthly_rate
        ) * (1 + monthly_rate)

    wealth_created = final_value - total_invested

    return {
        "years": years,
        "monthlyAmount": monthly_amount,
        "totalInvested": round(total_invested),
        "finalValue": round(final_value),
        "wealthCreated": round(wealth_created),
        "absoluteReturn": round((wealth_created / total_invested) * 100, 1),
        "cagr": round(annual_return * 100, 1),
    }
