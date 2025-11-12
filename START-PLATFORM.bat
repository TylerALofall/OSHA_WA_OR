@echo off
:: Sandra's Roofing Safety Platform - Easy Starter Script
:: Double-click this file to start the platform!

color 0A
title Sandra's Safety Platform - Starting Up

cls
echo ==================================
echo     Sandra's Safety Platform
echo            with Coffee!
echo ==================================
echo.
echo Starting up your safety platform...
echo Grab a coffee, this takes 10 seconds!
echo.

:: Navigate to the roofing platform directory
cd /d "%~dp0roofing-safety-platform"

:: Check if node_modules exists
if not exist "node_modules\" (
    echo.
    echo [92mFirst time setup - installing dependencies...[0m
    echo This will take 2-3 minutes. Go get that coffee!
    echo.
    call npm install
    echo.
    echo [92mSetup complete![0m
    echo.
)

:: Start the development server
cls
echo ==================================
echo     PLATFORM IS READY!
echo ==================================
echo.
echo Open your web browser and go to:
echo.
echo     http://localhost:3000
echo.
echo ==================================
echo.
echo Tips:
echo   - Keep this window open while using the platform
echo   - Press Ctrl+C to stop the platform
echo   - Close the browser to exit
echo.
echo Coffee-fueled compliance starts now!
echo.

:: Start the dev server
call npm run dev

pause
