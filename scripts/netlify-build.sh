#!/bin/sh
# vitepress build finishes but the process never exits (open handle), which stalls the Netlify deploy step.
# Run it in the background, wait for "build complete", then exit cleanly.
LOG=$(mktemp)
pnpm build > "$LOG" 2>&1 &
PID=$!
i=0
while [ $i -lt 600 ]; do
  if grep -q "build complete" "$LOG"; then break; fi
  if ! kill -0 $PID 2>/dev/null; then break; fi
  i=$((i+1)); sleep 1
done
cat "$LOG"
kill $PID 2>/dev/null
if grep -q "build complete" "$LOG" && [ -f .vitepress/dist/index.html ]; then
  exit 0
fi
exit 1
