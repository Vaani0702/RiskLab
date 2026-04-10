#!/bin/bash
cd ~/Desktop/RiskLab/backend && uvicorn main:app --reload &
cd ~/Desktop/RiskLab && npm run dev
