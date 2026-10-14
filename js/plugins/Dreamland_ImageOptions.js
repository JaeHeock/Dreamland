/*:
 * @target MZ
 * @plugindesc v4.1 드림랜드 이미지 기반 옵션 UI
 * @author OpenAI
 *
 * @param Background Image
 * @text 설정 배경 이미지
 * @type file
 * @dir img/pictures/
 * @default Dreamland_OptionsBackground
 *
 * @param BGM Image
 * @text BGM 음량 이미지
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param SE Image
 * @text 효과음 음량 이미지
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param BGS Image
 * @text 환경음 음량 이미지
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param Dash Image
 * @text 항상 달리기 이미지
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param Fullscreen Image
 * @text 전체화면 이미지
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param Shake Image
 * @text 화면 흔들림 이미지
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param On Active Image
 * @text ON 선택 이미지
 * @desc 현재 값이 ON일 때 표시합니다.
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param On Normal Image
 * @text ON 비선택 이미지
 * @desc 현재 값이 OFF일 때 ON 위치에 표시합니다.
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param Off Active Image
 * @text OFF 선택 이미지
 * @desc 현재 값이 OFF일 때 표시합니다.
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param Off Normal Image
 * @text OFF 비선택 이미지
 * @desc 현재 값이 ON일 때 OFF 위치에 표시합니다.
 * @type file
 * @dir img/pictures/
 * @default
 *
 * @param Label X
 * @text 옵션 이미지 중심 X
 * @type number
 * @default 275
 *
 * @param Label Width
 * @text 옵션 이미지 너비
 * @type number
 * @default 225
 *
 * @param Label Max Height
 * @text 옵션 이미지 최대 높이
 * @type number
 * @default 58
 *
 * @param BGM Y
 * @text BGM Y
 * @type number
 * @default 205
 *
 * @param SE Y
 * @text 효과음 Y
 * @type number
 * @default 269
 *
 * @param BGS Y
 * @text 환경음 Y
 * @type number
 * @default 337
 *
 * @param Dash Y
 * @text 항상 달리기 Y
 * @type number
 * @default 404
 *
 * @param Fullscreen Y
 * @text 전체화면 Y
 * @type number
 * @default 470
 *
 * @param Shake Y
 * @text 화면 흔들림 Y
 * @type number
 * @default 526
 *
 * @param Volume X
 * @text 음량 다이아 시작 X
 * @type number
 * @default 411
 *
 * @param Volume Gap
 * @text 음량 다이아 간격
 * @type number
 * @default 15
 *
 * @param Volume Symbol Size
 * @text 음량 다이아 크기
 * @type number
 * @default 14
 *
 * @param Volume Diamond Y Offset
 * @text 다이아 Y 보정
 * @desc 각 항목 중심 Y에서 더하는 값입니다. 음수면 위로 이동합니다.
 * @type number
 * @min -40
 * @max 40
 * @default -18
 *
 * @param Volume Value X
 * @text 음량 숫자 X
 * @type number
 * @default 578
 *
 * @param Volume Value Y Offset
 * @text 음량 숫자 Y 보정
 * @desc 각 항목 중심 Y에서 더하는 값입니다. 음수면 위로 이동합니다.
 * @type number
 * @min -40
 * @max 40
 * @default -17
 *
 * @param Toggle On X
 * @text ON 중심 X
 * @type number
 * @default 470
 *
 * @param Toggle Off X
 * @text OFF 중심 X
 * @type number
 * @default 580
 *
 * @param Toggle Width
 * @text ON/OFF 이미지 너비
 * @type number
 * @default 110
 *
 * @param Toggle Height
 * @text ON/OFF 이미지 높이
 * @type number
 * @default 42
 *
 * @param Hit X
 * @text 선택 영역 X
 * @type number
 * @default 190
 *
 * @param Hit Width
 * @text 선택 영역 너비
 * @type number
 * @default 440
 *
 * @param Hit Height
 * @text 선택 영역 높이
 * @type number
 * @default 54
 *
 * @param Volume Step
 * @text 음량 증감
 * @type number
 * @min 1
 * @max 100
 * @default 10
 *
 * @help
 * DREAMLAND 이미지 기반 옵션 화면 v4.1
 *
 * 표시 항목:
 * 1. BGM 음량
 * 2. 효과음 음량
 * 3. 환경음 음량
 * 4. 항상 달리기
 * 5. 전체화면
 * 6. 화면 흔들림
 *
 * 조작:
 *
 * ↑ / ↓
 *   옵션 항목 이동
 *
 * 음량 항목:
 * ← 음량 감소
 * → 음량 증가
 * Enter / Z 음량 증가
 *
 * ON/OFF 항목:
 * ← ON
 * → OFF
 * Enter / Z 현재 상태 반전
 *
 * ESC / X
 *   이전 화면
 *
 * 이전 Dreamland_CustomOptions 플러그인은 반드시 OFF 하세요.
 */

(() => {
    "use strict";

    // =========================================================
    // Plugin name
    // =========================================================

    const pluginName = (() => {
        const src = document.currentScript
            ? document.currentScript.src
            : "";

        const match = src.match(/([^/]+)\.js$/);

        return match
            ? match[1]
            : "Dreamland_ImageOptions";
    })();

    const p = PluginManager.parameters(pluginName);


    // =========================================================
    // Files
    // =========================================================

    const BACKGROUND =
        String(
            p["Background Image"] ||
            "Dreamland_OptionsBackground"
        );


    const LABEL_FILES = [
        String(p["BGM Image"] || ""),
        String(p["SE Image"] || ""),
        String(p["BGS Image"] || ""),
        String(p["Dash Image"] || ""),
        String(p["Fullscreen Image"] || ""),
        String(p["Shake Image"] || "")
    ];


    const ON_ACTIVE =
        String(p["On Active Image"] || "");

    const ON_NORMAL =
        String(p["On Normal Image"] || "");

    const OFF_ACTIVE =
        String(p["Off Active Image"] || "");

    const OFF_NORMAL =
        String(p["Off Normal Image"] || "");


    // =========================================================
    // UI parameters
    // =========================================================

    const LABEL_X =
        Number(p["Label X"] || 275);

    const LABEL_WIDTH =
        Number(p["Label Width"] || 225);

    const LABEL_MAX_HEIGHT =
        Number(p["Label Max Height"] || 58);


    const ROW_Y = [
        Number(p["BGM Y"] || 205),
        Number(p["SE Y"] || 269),
        Number(p["BGS Y"] || 337),
        Number(p["Dash Y"] || 404),
        Number(p["Fullscreen Y"] || 470),
        Number(p["Shake Y"] || 526)
    ];


    const VOLUME_X =
        Number(p["Volume X"] || 411);

    const VOLUME_GAP =
        Number(p["Volume Gap"] || 15);

    const VOLUME_SYMBOL_SIZE =
        Number(p["Volume Symbol Size"] || 14);

    const VOLUME_DIAMOND_Y =
        Number(
            p["Volume Diamond Y Offset"] ||
            -18
        );

    const VOLUME_VALUE_X =
        Number(p["Volume Value X"] || 578);

    const VOLUME_VALUE_Y =
        Number(
            p["Volume Value Y Offset"] ||
            -17
        );


    const TOGGLE_ON_X =
        Number(p["Toggle On X"] || 470);

    const TOGGLE_OFF_X =
        Number(p["Toggle Off X"] || 580);

    const TOGGLE_WIDTH =
        Number(p["Toggle Width"] || 110);

    const TOGGLE_HEIGHT =
        Number(p["Toggle Height"] || 42);


    const HIT_X =
        Number(p["Hit X"] || 190);

    const HIT_WIDTH =
        Number(p["Hit Width"] || 440);

    const HIT_HEIGHT =
        Number(p["Hit Height"] || 54);


    const VOLUME_STEP =
        Number(p["Volume Step"] || 10);


    // =========================================================
    // ConfigManager
    // =========================================================

    ConfigManager.dlFullscreen = false;
    ConfigManager.screenShake = true;


    const _ConfigManager_makeData =
        ConfigManager.makeData;


    ConfigManager.makeData = function() {

        const config =
            _ConfigManager_makeData.call(this);

        config.dlFullscreen =
            !!this.dlFullscreen;

        config.screenShake =
            this.screenShake !== false;

        return config;
    };


    const _ConfigManager_applyData =
        ConfigManager.applyData;


    ConfigManager.applyData = function(config) {

        _ConfigManager_applyData.call(
            this,
            config
        );


        this.dlFullscreen =
            Object.prototype.hasOwnProperty.call(
                config,
                "dlFullscreen"
            )
                ? !!config.dlFullscreen
                : false;


        this.screenShake =
            Object.prototype.hasOwnProperty.call(
                config,
                "screenShake"
            )
                ? !!config.screenShake
                : true;
    };


    // =========================================================
    // Fullscreen
    // =========================================================

    function isFullscreen() {

        try {

            if (Graphics._isFullScreen) {
                return Graphics._isFullScreen();
            }

            return !!document.fullscreenElement;

        } catch (e) {

            return false;
        }
    }


    function setFullscreen(value) {

        try {

            if (
                value &&
                !isFullscreen()
            ) {

                if (
                    Graphics._requestFullScreen
                ) {

                    Graphics._requestFullScreen();

                } else if (
                    document.documentElement &&
                    document.documentElement.requestFullscreen
                ) {

                    document.documentElement.requestFullscreen();
                }

            } else if (
                !value &&
                isFullscreen()
            ) {

                if (
                    Graphics._cancelFullScreen
                ) {

                    Graphics._cancelFullScreen();

                } else if (
                    document.exitFullscreen
                ) {

                    document.exitFullscreen();
                }
            }

        } catch (e) {

            console.warn(
                "Dreamland fullscreen error:",
                e
            );
        }
    }


    // =========================================================
    // Screen shake ON/OFF
    // =========================================================

    const _Game_Screen_startShake =
        Game_Screen.prototype.startShake;


    Game_Screen.prototype.startShake =
        function(
            power,
            speed,
            duration
        ) {

            if (
                ConfigManager.screenShake === false
            ) {

                this._shakePower = 0;
                this._shakeSpeed = 0;
                this._shakeDuration = 0;
                this._shake = 0;

                return;
            }


            _Game_Screen_startShake.call(
                this,
                power,
                speed,
                duration
            );
        };


    // =========================================================
    // Scene_Options
    // =========================================================

    Scene_Options.prototype.createBackground =
        function() {

            this._backgroundSprite =
                new Sprite();


            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(
                    BACKGROUND
                );


            this._backgroundSprite.bitmap
                .addLoadListener(() => {

                    const bitmap =
                        this._backgroundSprite.bitmap;


                    if (
                        bitmap.width > 0 &&
                        bitmap.height > 0
                    ) {

                        this._backgroundSprite.scale.x =
                            Graphics.width /
                            bitmap.width;


                        this._backgroundSprite.scale.y =
                            Graphics.height /
                            bitmap.height;
                    }
                });


            this.addChild(
                this._backgroundSprite
            );
        };


    Scene_Options.prototype.optionsWindowRect =
        function() {

            return new Rectangle(
                0,
                0,
                Graphics.boxWidth,
                Graphics.boxHeight
            );
        };


    Scene_Options.prototype.createOptionsWindow =
        function() {

            const rect =
                this.optionsWindowRect();


            this._optionsWindow =
                new Window_DreamlandOptions(
                    rect
                );


            this._optionsWindow.setHandler(
                "cancel",
                this.popScene.bind(this)
            );


            this.addWindow(
                this._optionsWindow
            );
        };


    // =========================================================
    // Window
    // =========================================================

    function Window_DreamlandOptions() {

        this.initialize(...arguments);
    }


    Window_DreamlandOptions.prototype =
        Object.create(
            Window_Command.prototype
        );


    Window_DreamlandOptions.prototype.constructor =
        Window_DreamlandOptions;


    // =========================================================
    // Initialize
    // =========================================================

    Window_DreamlandOptions.prototype.initialize =
        function(rect) {

            this._labelBitmaps = [];
            this._toggleBitmaps = {};
            this._lastIndex = -1;


            Window_Command.prototype.initialize.call(
                this,
                rect
            );


            // 기본 RPG Maker 윈도우 제거
            this.opacity = 0;
            this.backOpacity = 0;

            this.padding = 0;

            this.createContents();


            // ---------------------------------------------
            // 6개 옵션 이미지
            // ---------------------------------------------

            this._labelBitmaps =
                LABEL_FILES.map(
                    filename => {

                        if (!filename) {
                            return null;
                        }


                        const bitmap =
                            ImageManager.loadPicture(
                                filename
                            );


                        bitmap.addLoadListener(
                            () => this.refresh()
                        );


                        return bitmap;
                    }
                );


            // ---------------------------------------------
            // ON/OFF 이미지
            // ---------------------------------------------

            this._toggleBitmaps.onActive =
                this.loadUiPicture(
                    ON_ACTIVE
                );

            this._toggleBitmaps.onNormal =
                this.loadUiPicture(
                    ON_NORMAL
                );

            this._toggleBitmaps.offActive =
                this.loadUiPicture(
                    OFF_ACTIVE
                );

            this._toggleBitmaps.offNormal =
                this.loadUiPicture(
                    OFF_NORMAL
                );


            this.select(0);
            this.activate();

            this.refresh();
        };


    // =========================================================
    // UI image loader
    // =========================================================

    Window_DreamlandOptions.prototype.loadUiPicture =
        function(filename) {

            if (!filename) {
                return null;
            }


            const bitmap =
                ImageManager.loadPicture(
                    filename
                );


            bitmap.addLoadListener(
                () => this.refresh()
            );


            return bitmap;
        };


    // =========================================================
    // Commands
    // =========================================================

    Window_DreamlandOptions.prototype.makeCommandList =
        function() {

            this.addCommand(
                "BGM",
                "bgmVolume"
            );

            this.addCommand(
                "SE",
                "seVolume"
            );

            this.addCommand(
                "BGS",
                "bgsVolume"
            );

            this.addCommand(
                "Dash",
                "alwaysDash"
            );

            this.addCommand(
                "Fullscreen",
                "dlFullscreen"
            );

            this.addCommand(
                "Shake",
                "screenShake"
            );
        };


    // =========================================================
    // Item Rect
    // =========================================================

    Window_DreamlandOptions.prototype.itemRect =
        function(index) {

            return new Rectangle(

                HIT_X,

                ROW_Y[index] -
                HIT_HEIGHT / 2,

                HIT_WIDTH,

                HIT_HEIGHT
            );
        };


    // =========================================================
    // 기본 커서 제거
    // =========================================================

    Window_DreamlandOptions.prototype.refreshCursor =
        function() {

            this.setCursorRect(
                0,
                0,
                0,
                0
            );
        };


    // =========================================================
    // Update
    // =========================================================

    Window_DreamlandOptions.prototype.update =
        function() {

            Window_Command.prototype.update.call(
                this
            );


            if (
                this._lastIndex !==
                this.index()
            ) {

                this._lastIndex =
                    this.index();

                this.refresh();
            }
        };


    // =========================================================
    // Draw Item
    // =========================================================

    Window_DreamlandOptions.prototype.drawItem =
        function(index) {

            const symbol =
                this.commandSymbol(
                    index
                );


            const selected =
                this.index() === index;


            this.drawLabel(
                index,
                selected
            );


            if (
                this.isVolumeSymbol(
                    symbol
                )
            ) {

                this.drawVolume(
                    index,
                    symbol,
                    selected
                );

            } else {

                this.drawToggle(
                    index,
                    symbol,
                    selected
                );
            }
        };


    // =========================================================
    // Label
    // =========================================================

    Window_DreamlandOptions.prototype.drawLabel =
        function(
            index,
            selected
        ) {

            const bitmap =
                this._labelBitmaps[
                    index
                ];


            if (
                !bitmap ||
                !bitmap.isReady() ||
                bitmap.width <= 0 ||
                bitmap.height <= 0
            ) {
                return;
            }


            let targetW =
                LABEL_WIDTH;


            // 선택 중 약간 확대
            if (selected) {

                targetW *=
                    1.02;
            }


            let ratio =
                targetW /
                bitmap.width;


            let targetH =
                bitmap.height *
                ratio;


            if (
                targetH >
                LABEL_MAX_HEIGHT
            ) {

                ratio =
                    LABEL_MAX_HEIGHT /
                    bitmap.height;


                targetW =
                    bitmap.width *
                    ratio;


                targetH =
                    LABEL_MAX_HEIGHT;
            }


            const x =
                LABEL_X -
                targetW / 2;


            const y =
                ROW_Y[index] -
                targetH / 2;


            this.contents.paintOpacity =
                selected
                    ? 255
                    : 225;


            this.contents.blt(

                bitmap,

                0,
                0,

                bitmap.width,
                bitmap.height,

                Math.round(x),
                Math.round(y),

                Math.round(targetW),
                Math.round(targetH)
            );


            this.contents.paintOpacity =
                255;
        };


    // =========================================================
    // Volume symbol
    // =========================================================

    Window_DreamlandOptions.prototype.isVolumeSymbol =
        function(symbol) {

            return (

                symbol ===
                    "bgmVolume" ||

                symbol ===
                    "seVolume" ||

                symbol ===
                    "bgsVolume"
            );
        };


    // =========================================================
    // Config value
    // =========================================================

    Window_DreamlandOptions.prototype.getConfigValue =
        function(symbol) {

            return ConfigManager[
                symbol
            ];
        };


    // =========================================================
    // Volume UI
    // =========================================================

    Window_DreamlandOptions.prototype.drawVolume =
        function(
            index,
            symbol,
            selected
        ) {

            const value =
                Number(
                    this.getConfigValue(
                        symbol
                    ) || 0
                );


            const litCount =
                Math.round(
                    value / 10
                );


            // ---------------------------------------------
            // Diamonds
            // ---------------------------------------------

            this.contents.fontSize =
                VOLUME_SYMBOL_SIZE;


            for (
                let i = 0;
                i < 10;
                i++
            ) {

                const x =
                    VOLUME_X +
                    i *
                    VOLUME_GAP;


                const on =
                    i <
                    litCount;


                if (on) {

                    this.changeTextColor(

                        selected
                            ? "#fff1b5"
                            : "#d8a66c"
                    );

                } else {

                    this.changeTextColor(
                        "#493139"
                    );
                }


                this.drawText(

                    "◆",

                    x,

                    ROW_Y[index] +
                    VOLUME_DIAMOND_Y,

                    18,

                    26,

                    "center"
                );
            }


            // ---------------------------------------------
            // Number
            // ---------------------------------------------

            this.contents.fontSize =
                21;


            this.changeTextColor(

                selected
                    ? "#fff4df"
                    : "#cab8ba"
            );


            this.drawText(

                String(value),

                VOLUME_VALUE_X,

                ROW_Y[index] +
                VOLUME_VALUE_Y,

                48,

                30,

                "right"
            );


            this.resetTextColor();
        };


    // =========================================================
    // Toggle UI
    // =========================================================

    Window_DreamlandOptions.prototype.drawToggle =
        function(
            index,
            symbol,
            selected
        ) {

            const value =
                !!this.getConfigValue(
                    symbol
                );


            // ON쪽 이미지
            const onBitmap =
                value
                    ? this._toggleBitmaps.onActive
                    : this._toggleBitmaps.onNormal;


            // OFF쪽 이미지
            const offBitmap =
                value
                    ? this._toggleBitmaps.offNormal
                    : this._toggleBitmaps.offActive;


            this.drawToggleBitmap(

                onBitmap,

                TOGGLE_ON_X,

                ROW_Y[index],

                selected
            );


            this.drawToggleBitmap(

                offBitmap,

                TOGGLE_OFF_X,

                ROW_Y[index],

                selected
            );
        };


    // =========================================================
    // Toggle bitmap
    // =========================================================

    Window_DreamlandOptions.prototype.drawToggleBitmap =
        function(
            bitmap,
            centerX,
            centerY,
            selected
        ) {

            if (
                !bitmap ||
                !bitmap.isReady() ||
                bitmap.width <= 0 ||
                bitmap.height <= 0
            ) {
                return;
            }


            let width =
                TOGGLE_WIDTH;


            let height =
                TOGGLE_HEIGHT;


            // 선택된 행은 2% 확대
            if (selected) {

                width *=
                    1.02;

                height *=
                    1.02;
            }


            const x =
                centerX -
                width / 2;


            const y =
                centerY -
                height / 2;


            this.contents.paintOpacity =
                selected
                    ? 255
                    : 225;


            this.contents.blt(

                bitmap,

                0,
                0,

                bitmap.width,
                bitmap.height,

                Math.round(x),
                Math.round(y),

                Math.round(width),
                Math.round(height)
            );


            this.contents.paintOpacity =
                255;
        };


    // =========================================================
    // OK / Enter / Z
    // =========================================================

    Window_DreamlandOptions.prototype.processOk =
        function() {

            const index =
                this.index();


            if (
                index < 0
            ) {
                return;
            }


            const symbol =
                this.commandSymbol(
                    index
                );


            // ---------------------------------------------
            // Volume
            // Enter 누르면 +10
            // 100 이후 0으로 순환
            // ---------------------------------------------

            if (
                this.isVolumeSymbol(
                    symbol
                )
            ) {

                let value =
                    Number(
                        this.getConfigValue(
                            symbol
                        ) || 0
                    );


                value +=
                    VOLUME_STEP;


                if (
                    value >
                    100
                ) {

                    value = 0;
                }


                this.changeDreamlandValue(
                    symbol,
                    value
                );

                return;
            }


            // ---------------------------------------------
            // Toggle
            // Enter/Z = 현재값 반전
            // ---------------------------------------------

            const currentValue =
                !!this.getConfigValue(
                    symbol
                );


            this.changeDreamlandValue(
                symbol,
                !currentValue
            );
        };


    // =========================================================
    // RIGHT
    //
    // Volume = 증가
    // Toggle = OFF
    // =========================================================

    Window_DreamlandOptions.prototype.cursorRight =
        function(wrap) {

            const index =
                this.index();


            if (
                index < 0
            ) {
                return;
            }


            const symbol =
                this.commandSymbol(
                    index
                );


            // Volume
            if (
                this.isVolumeSymbol(
                    symbol
                )
            ) {

                const value =
                    Number(
                        this.getConfigValue(
                            symbol
                        ) || 0
                    );


                this.changeDreamlandValue(

                    symbol,

                    Math.min(
                        100,
                        value +
                        VOLUME_STEP
                    )
                );

                return;
            }


            // 오른쪽 = OFF
            this.changeDreamlandValue(
                symbol,
                false
            );
        };


    // =========================================================
    // LEFT
    //
    // Volume = 감소
    // Toggle = ON
    // =========================================================

    Window_DreamlandOptions.prototype.cursorLeft =
        function(wrap) {

            const index =
                this.index();


            if (
                index < 0
            ) {
                return;
            }


            const symbol =
                this.commandSymbol(
                    index
                );


            // Volume
            if (
                this.isVolumeSymbol(
                    symbol
                )
            ) {

                const value =
                    Number(
                        this.getConfigValue(
                            symbol
                        ) || 0
                    );


                this.changeDreamlandValue(

                    symbol,

                    Math.max(
                        0,
                        value -
                        VOLUME_STEP
                    )
                );

                return;
            }


            // 왼쪽 = ON
            this.changeDreamlandValue(
                symbol,
                true
            );
        };


    // =========================================================
    // Change value
    // =========================================================

    Window_DreamlandOptions.prototype.changeDreamlandValue =
        function(
            symbol,
            value
        ) {

            const oldValue =
                this.getConfigValue(
                    symbol
                );


            if (
                oldValue === value
            ) {

                return;
            }


            ConfigManager[
                symbol
            ] =
                value;


            // ---------------------------------------------
            // Fullscreen
            // ---------------------------------------------

            if (
                symbol ===
                "dlFullscreen"
            ) {

                setFullscreen(
                    value
                );
            }


            // ---------------------------------------------
            // Screen Shake
            // OFF하면 현재 흔들림도 즉시 중단
            // ---------------------------------------------

            if (
                symbol ===
                    "screenShake" &&
                value === false &&
                $gameScreen
            ) {

                $gameScreen._shake = 0;
                $gameScreen._shakePower = 0;
                $gameScreen._shakeSpeed = 0;
                $gameScreen._shakeDuration = 0;
            }


            // 효과음
            SoundManager.playCursor();


            // 설정 저장
            ConfigManager.save();


            // 즉시 UI 갱신
            this.refresh();
        };


    // =========================================================
    // Cancel
    // =========================================================

    Window_DreamlandOptions.prototype.processCancel =
        function() {

            SoundManager.playCancel();


            this.callHandler(
                "cancel"
            );
        };


    // =========================================================
    // Mouse / Touch hit test
    // =========================================================

    Window_DreamlandOptions.prototype.hitTest =
        function(x, y) {

            for (
                let i = 0;
                i < this.maxItems();
                i++
            ) {

                const rect =
                    this.itemRect(
                        i
                    );


                if (
                    x >= rect.x &&
                    x <
                        rect.x +
                        rect.width &&
                    y >= rect.y &&
                    y <
                        rect.y +
                        rect.height
                ) {

                    return i;
                }
            }


            return -1;
        };

})();