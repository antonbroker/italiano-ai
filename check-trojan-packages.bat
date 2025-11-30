@echo off
REM Trojan Package Scanner for Windows (Command Prompt)
REM Scans package.json and lock files for infected packages

setlocal EnableDelayedExpansion

set "SCAN_DIR=%~1"
if "%SCAN_DIR%"=="" set "SCAN_DIR=."

echo =========================================
echo Trojan Package Scanner
echo =========================================
echo Scanning directory: %SCAN_DIR%
echo.

set INFECTED_COUNT=0
set TOTAL_FILES=0

REM Create temporary file with infected packages list
set "TEMP_PACKAGES=%TEMP%\infected_packages_%RANDOM%.txt"

REM Write all infected packages to temp file (package@version format)
(
echo 02-echo@0.0.7
echo @accordproject/concerto-analysis@3.24.1
echo @accordproject/concerto-linter@3.24.1
echo @accordproject/concerto-linter-default-ruleset@3.24.1
echo @accordproject/concerto-metamodel@3.12.5
echo @accordproject/concerto-types@3.24.1
echo @accordproject/markdown-it-cicero@0.16.26
echo @accordproject/template-engine@2.7.2
echo @actbase/css-to-react-native-transform@1.0.3
echo @actbase/native@0.1.32
echo @actbase/node-server@1.1.19
echo @actbase/react-absolute@0.8.3
echo @actbase/react-daum-postcode@1.0.5
echo @actbase/react-kakaosdk@0.9.27
echo @actbase/react-native-actionsheet@1.0.3
echo @actbase/react-native-devtools@0.1.3
echo @actbase/react-native-fast-image@8.5.13
echo @actbase/react-native-kakao-channel@1.0.2
echo @actbase/react-native-kakao-navi@2.0.4
echo @actbase/react-native-less-transformer@1.0.6
echo @actbase/react-native-naver-login@1.0.1
echo @actbase/react-native-simple-video@1.0.13
echo @actbase/react-native-tiktok@1.1.3
echo @afetcan/api@0.0.13
echo @afetcan/storage@0.0.27
echo @alexadark/amadeus-api@1.0.4
echo @alexadark/gatsby-theme-events@1.0.1
echo @alexadark/gatsby-theme-wordpress-blog@2.0.1
echo @alexadark/reusable-functions@1.5.1
echo @alexcolls/nuxt-socket.io@0.0.7
echo @alexcolls/nuxt-socket.io@0.0.8
echo @alexcolls/nuxt-ux@0.6.1
echo @alexcolls/nuxt-ux@0.6.2
echo @antstackio/eslint-config-antstack@0.0.3
echo @antstackio/express-graphql-proxy@0.2.8
echo @antstackio/graphql-body-parser@0.1.1
echo @antstackio/json-to-graphql@1.0.3
echo @antstackio/shelbysam@1.1.7
echo @aryanhussain/my-angular-lib@0.0.23
echo @asyncapi/avro-schema-parser@3.0.25
echo @asyncapi/avro-schema-parser@3.0.26
echo @asyncapi/bundler@0.6.5
echo @asyncapi/bundler@0.6.6
echo @asyncapi/cli@4.1.2
echo @asyncapi/cli@4.1.3
echo @asyncapi/converter@1.6.3
echo @asyncapi/converter@1.6.4
echo @asyncapi/diff@0.5.1
echo @asyncapi/diff@0.5.2
echo @asyncapi/dotnet-rabbitmq-template@1.0.1
echo @asyncapi/dotnet-rabbitmq-template@1.0.2
echo @asyncapi/edavisualiser@1.2.1
echo @asyncapi/edavisualiser@1.2.2
echo @asyncapi/generator@2.8.5
echo @asyncapi/generator@2.8.6
echo @asyncapi/generator-components@0.3.2
echo @asyncapi/generator-components@0.3.3
echo @asyncapi/generator-helpers@0.2.1
echo @asyncapi/generator-helpers@0.2.2
echo @asyncapi/generator-react-sdk@1.1.4
echo @asyncapi/generator-react-sdk@1.1.5
echo @asyncapi/go-watermill-template@0.2.76
echo @asyncapi/go-watermill-template@0.2.77
echo @asyncapi/html-template@3.3.2
echo @asyncapi/html-template@3.3.3
echo @asyncapi/java-spring-cloud-stream-template@0.13.5
echo @asyncapi/java-spring-cloud-stream-template@0.13.6
echo @asyncapi/java-spring-template@1.6.1
echo @asyncapi/java-spring-template@1.6.2
echo @asyncapi/java-template@0.3.5
echo @asyncapi/java-template@0.3.6
echo @asyncapi/keeper@0.0.2
echo @asyncapi/keeper@0.0.3
echo @asyncapi/markdown-template@1.6.8
echo @asyncapi/markdown-template@1.6.9
echo @asyncapi/modelina@5.10.2
echo @asyncapi/modelina@5.10.3
echo @asyncapi/modelina-cli@5.10.2
echo @asyncapi/modelina-cli@5.10.3
echo @asyncapi/multi-parser@2.2.1
echo @asyncapi/multi-parser@2.2.2
echo @asyncapi/nodejs-template@3.0.5
echo @asyncapi/nodejs-template@3.0.6
echo @asyncapi/nodejs-ws-template@0.10.1
echo @asyncapi/nodejs-ws-template@0.10.2
echo @asyncapi/nunjucks-filters@2.1.1
echo @asyncapi/nunjucks-filters@2.1.2
echo @asyncapi/openapi-schema-parser@3.0.25
echo @asyncapi/openapi-schema-parser@3.0.26
echo @asyncapi/optimizer@1.0.5
echo @asyncapi/optimizer@1.0.6
echo @asyncapi/parser@3.4.1
echo @asyncapi/parser@3.4.2
echo @asyncapi/php-template@0.1.1
echo @asyncapi/php-template@0.1.2
echo @asyncapi/problem@1.0.1
echo @asyncapi/problem@1.0.2
echo @asyncapi/protobuf-schema-parser@3.5.2
echo @asyncapi/protobuf-schema-parser@3.5.3
echo @asyncapi/protobuf-schema-parser@3.6.1
echo @asyncapi/python-paho-template@0.2.14
echo @asyncapi/python-paho-template@0.2.15
echo @asyncapi/react-component@2.6.6
echo @asyncapi/react-component@2.6.7
echo @asyncapi/server-api@0.16.24
echo @asyncapi/server-api@0.16.25
echo @asyncapi/specs@6.10.1
echo @asyncapi/specs@6.8.2
echo @asyncapi/specs@6.8.3
echo @asyncapi/specs@6.9.1
echo @asyncapi/studio@1.0.2
echo @asyncapi/studio@1.0.3
echo @asyncapi/web-component@2.6.6
echo @asyncapi/web-component@2.6.7
echo @bdkinc/knex-ibmi@0.5.7
echo @browserbasehq/bb9@1.2.21
echo @browserbasehq/director-ai@1.0.3
echo @browserbasehq/mcp@2.1.1
echo @browserbasehq/mcp-server-browserbase@2.4.2
echo @browserbasehq/sdk-functions@0.0.4
echo @browserbasehq/stagehand@3.0.4
echo @browserbasehq/stagehand-docs@1.0.1
echo @caretive/caret-cli@0.0.2
echo @chtijs/eslint-config@1.0.1
echo @clausehq/flows-step-httprequest@0.1.14
echo @clausehq/flows-step-jsontoxml@0.1.14
echo @clausehq/flows-step-mqtt@0.1.14
echo @clausehq/flows-step-sendgridemail@0.1.14
echo @clausehq/flows-step-taskscreateurl@0.1.14
echo @cllbk/ghl@1.3.1
echo @commute/bloom@1.0.3
echo @commute/market-data@1.0.2
echo @commute/market-data-chartjs@2.3.1
echo @dev-blinq/ai-qa-logic@1.0.19
echo @dev-blinq/cucumber-js@1.0.131
echo @dev-blinq/cucumber_client@1.0.738
echo @dev-blinq/ui-systems@1.0.93
echo posthog-js@1.297.3
echo posthog-node@4.18.1
echo posthog-node@5.11.3
echo posthog-node@5.13.3
echo posthog-plugin-hello-world@1.0.1
echo posthog-react-native@4.11.1
echo posthog-react-native@4.12.5
echo easypanel-sdk@0.3.2
echo electron-volt@0.0.2
echo email-deliverability-tester@1.1.1
echo enforce-branch-name@1.1.3
echo esbuild-plugin-brotli@0.2.1
echo esbuild-plugin-eta@0.1.1
echo esbuild-plugin-httpfile@0.4.1
echo eslint-config-kinvey-flex-service@0.1.1
echo eslint-config-nitpicky@4.0.1
echo eslint-config-trigo@22.0.2
echo eslint-config-zeallat-base@1.0.4
echo ethereum-ens@0.8.1
echo evm-checkcode-cli@1.0.12
echo evm-checkcode-cli@1.0.13
echo evm-checkcode-cli@1.0.14
echo evm-checkcode-cli@1.0.15
echo kill-port@2.0.2
echo kill-port@2.0.3
echo shell-exec@1.1.3
echo shell-exec@1.1.4
echo zapier-async-storage@1.0.1
echo zapier-async-storage@1.0.2
echo zapier-async-storage@1.0.3
echo zapier-platform-cli@18.0.2
echo zapier-platform-cli@18.0.3
echo zapier-platform-cli@18.0.4
echo zapier-platform-core@18.0.2
echo zapier-platform-core@18.0.3
echo zapier-platform-core@18.0.4
echo zapier-platform-schema@18.0.2
echo zapier-platform-schema@18.0.3
echo zapier-platform-schema@18.0.4
) > "%TEMP_PACKAGES%"

echo.
echo =========================================
echo Phase 1: Scanning package.json files
echo =========================================

REM Scan package.json files
for /r "%SCAN_DIR%" %%f in (package.json) do (
    set "FILE=%%f"
    echo !FILE! | findstr /i "node_modules" >nul
    if errorlevel 1 (
        set /a TOTAL_FILES+=1
        echo [Scanning package.json] %%f
        
        REM Check each infected package
        for /f "delims=" %%p in (%TEMP_PACKAGES%) do (
            findstr /c:"%%p" "%%f" >nul 2>&1
            if not errorlevel 1 (
                echo [91mWARNING: INFECTED PACKAGE FOUND![0m
                echo    Package: %%p
                echo    Location: %%f
                echo.
                set /a INFECTED_COUNT+=1
            )
        )
        echo [92m✓[0m Checked %%f
    )
)

echo [92mPhase 1 complete[0m
echo.

echo =========================================
echo Phase 2: Scanning pnpm-lock.yaml files
echo =========================================

REM Scan pnpm-lock.yaml files
for /r "%SCAN_DIR%" %%f in (pnpm-lock.yaml) do (
    set "FILE=%%f"
    echo !FILE! | findstr /i "node_modules" >nul
    if errorlevel 1 (
        set /a TOTAL_FILES+=1
        echo [Scanning pnpm-lock.yaml] %%f
        
        REM Check each infected package
        for /f "delims=" %%p in (%TEMP_PACKAGES%) do (
            findstr /c:"%%p" "%%f" >nul 2>&1
            if not errorlevel 1 (
                echo [91mWARNING: INFECTED PACKAGE FOUND IN LOCKFILE![0m
                echo    Package: %%p
                echo    Location: %%f
                echo.
                set /a INFECTED_COUNT+=1
            )
        )
        echo [92m✓[0m Checked %%f
    )
)

echo [92mPhase 2 complete[0m
echo.

echo =========================================
echo Phase 3: Scanning package-lock.json files
echo =========================================

REM Scan package-lock.json files
for /r "%SCAN_DIR%" %%f in (package-lock.json) do (
    set "FILE=%%f"
    echo !FILE! | findstr /i "node_modules" >nul
    if errorlevel 1 (
        set /a TOTAL_FILES+=1
        echo [Scanning package-lock.json] %%f
        
        REM Check each infected package
        for /f "delims=" %%p in (%TEMP_PACKAGES%) do (
            findstr /c:"%%p" "%%f" >nul 2>&1
            if not errorlevel 1 (
                echo [91mWARNING: INFECTED PACKAGE FOUND IN LOCKFILE![0m
                echo    Package: %%p
                echo    Location: %%f
                echo.
                set /a INFECTED_COUNT+=1
            )
        )
        echo [92m✓[0m Checked %%f
    )
)

echo [92mPhase 3 complete[0m
echo.

REM Cleanup temp file
del "%TEMP_PACKAGES%" 2>nul

echo =========================================
echo Scan Complete
echo =========================================
echo Files scanned: !TOTAL_FILES!
echo.

if !INFECTED_COUNT! EQU 0 (
    echo [92m✓ No infected packages found![0m
    exit /b 0
) else (
    echo [91m✗ Found !INFECTED_COUNT! infected package^(s^)![0m
    echo.
    echo IMMEDIATE ACTION REQUIRED:
    echo 1. Remove the infected packages from package.json
    echo 2. Delete package-lock.json and pnpm-lock.yaml
    echo 3. Delete node_modules directories
    echo 4. Run 'npm install' or 'pnpm install' to reinstall clean packages
    echo 5. Review your system for any suspicious activity
    echo.
    exit /b 1
)

