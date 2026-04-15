#!/bin/bash
cd "$(dirname "$0")"
node scripts/start-dev.js
read -n 1 -s -r -p "按任意键关闭..."
echo
