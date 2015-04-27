::set wFolder="%1"

echo off
node %WATCHER%\watch.js %CD% %1
echo on