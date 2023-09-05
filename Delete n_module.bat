@echo off
color 0b
:Home
git status
echo You wanna DELETE project?
set /p go=*Press Enter* :
goto del
setlocal
pause

:del
rmdir /s node_modules
echo DELETE Complete.
pause