/*:
 * @target MZ
 * @plugindesc Dreamland 캐릭터 픽셀 선명화 + 크기 조절 v1.1
 * @author OpenAI
 *
 * @param Player Scale
 * @text 주인공 크기
 * @desc 1.00 = 원본 크기 / 1.20 = 120%
 * @type number
 * @decimals 2
 * @min 0.50
 * @max 3.00
 * @default 1.20
 *
 * @param Follower Scale
 * @text 동료 크기
 * @desc 파티를 따라다니는 동료 캐릭터의 크기입니다.
 * @type number
 * @decimals 2
 * @min 0.50
 * @max 3.00
 * @default 1.20
 *
 * @param Event Scale
 * @text 이벤트 캐릭터 크기
 * @desc NPC 등의 일반 이벤트 캐릭터 크기입니다.
 * @type number
 * @decimals 2
 * @min 0.50
 * @max 3.00
 * @default 1.00
 *
 * @param Use Nearest
 * @text 캐릭터 선명화
 * @type boolean
 * @on 사용
 * @off 사용 안 함
 * @default true
 *
 * @help
 * ============================================================
 * Dreamland Pixel Character v1.1
 * ============================================================
 *
 * 기능:
 *
 * - 플레이어 캐릭터만 선명한 NEAREST 필터 적용
 * - 동료 캐릭터에도 적용
 * - 일반 이벤트 캐릭터에도 적용
 * - 주인공 / 동료 / 이벤트의 크기를 각각 설정 가능
 *
 * 이전 버전에서 사용했던
 * Math.round(sprite.x), Math.round(sprite.y)
 * 방식은 완전히 제거되었습니다.
 *
 * 따라서 이동 중 캐릭터가 심하게 떨리는 현상을 줄입니다.
 *
 * 타이틀 / 설정창 / UI / 배경에는 영향을 주지 않습니다.
 *
 * 권장 플러그인 순서:
 *
 * Dreamland_HiDPI
 * Dreamland_PixelCharacter
 * 기타 플러그인...
 *
 * 캐릭터 단일 시트 파일은 반드시
 *
 * $Dreamland_Hero.png
 *
 * 처럼 파일 이름 앞에 $를 붙이세요.
 */

(() => {

    "use strict";


    // =========================================================
    // Plugin Name
    // =========================================================

    const pluginName = (() => {

        const src =
            document.currentScript
                ? document.currentScript.src
                : "";

        const match =
            src.match(/([^/]+)\.js$/);

        return match
            ? match[1]
            : "Dreamland_PixelCharacter";

    })();


    // =========================================================
    // Parameters
    // =========================================================

    const params =
        PluginManager.parameters(
            pluginName
        );


    const PLAYER_SCALE =
        Number(
            params["Player Scale"] ||
            1.20
        );


    const FOLLOWER_SCALE =
        Number(
            params["Follower Scale"] ||
            1.20
        );


    const EVENT_SCALE =
        Number(
            params["Event Scale"] ||
            1.00
        );


    const USE_NEAREST =
        String(
            params["Use Nearest"] ||
            "true"
        ) === "true";


    // =========================================================
    // 캐릭터 타입 확인
    // =========================================================

    Sprite_Character.prototype.dreamlandCharacterScale =
        function() {

            const character =
                this._character;


            // ---------------------------------------------
            // 플레이어
            // ---------------------------------------------

            if (
                typeof $gamePlayer !== "undefined" &&
                character === $gamePlayer
            ) {

                return PLAYER_SCALE;
            }


            // ---------------------------------------------
            // 동료
            // ---------------------------------------------

            if (
                typeof Game_Follower !== "undefined" &&
                character instanceof Game_Follower
            ) {

                return FOLLOWER_SCALE;
            }


            // ---------------------------------------------
            // 이벤트
            // ---------------------------------------------

            if (
                typeof Game_Event !== "undefined" &&
                character instanceof Game_Event
            ) {

                return EVENT_SCALE;
            }


            return 1.0;
        };


    // =========================================================
    // NEAREST 필터
    // =========================================================

    Sprite_Character.prototype.applyDreamlandPixelFilter =
        function() {

            if (!USE_NEAREST) {
                return;
            }


            const bitmap =
                this.bitmap;


            if (!bitmap) {
                return;
            }


            const applyFilter = () => {

                // -----------------------------------------
                // Bitmap 자체 BaseTexture
                // -----------------------------------------

                if (
                    bitmap.baseTexture
                ) {

                    bitmap.baseTexture.scaleMode =
                        PIXI.SCALE_MODES.NEAREST;
                }


                // -----------------------------------------
                // Sprite Texture
                // -----------------------------------------

                if (
                    this.texture &&
                    this.texture.baseTexture
                ) {

                    this.texture.baseTexture.scaleMode =
                        PIXI.SCALE_MODES.NEAREST;
                }


                // -----------------------------------------
                // 중요
                //
                // roundPixels는 사용하지 않음.
                //
                // 위치를 강제로 반올림하면
                // 이동 중 미세한 떨림이 발생할 수 있음.
                // -----------------------------------------

                this.roundPixels = false;
            };


            // ---------------------------------------------
            // 이미 로딩 완료
            // ---------------------------------------------

            if (
                bitmap.isReady &&
                bitmap.isReady()
            ) {

                applyFilter();

            } else if (
                bitmap.addLoadListener
            ) {

                // -----------------------------------------
                // 로딩 완료 후 적용
                // -----------------------------------------

                bitmap.addLoadListener(
                    applyFilter
                );
            }
        };


    // =========================================================
    // Character Bitmap 생성
    // =========================================================

    const _Sprite_Character_setCharacterBitmap =
        Sprite_Character.prototype.setCharacterBitmap;


    Sprite_Character.prototype.setCharacterBitmap =
        function() {

            _Sprite_Character_setCharacterBitmap.call(
                this
            );


            this.applyDreamlandPixelFilter();
        };


    // =========================================================
    // Bitmap 변경 감지
    //
    // 이벤트 페이지 변경이나 캐릭터 그래픽 교체 시
    // NEAREST를 다시 적용
    // =========================================================

    const _Sprite_Character_updateBitmap =
        Sprite_Character.prototype.updateBitmap;


    Sprite_Character.prototype.updateBitmap =
        function() {

            const previousBitmap =
                this.bitmap;


            _Sprite_Character_updateBitmap.call(
                this
            );


            if (
                this.bitmap &&
                this.bitmap !== previousBitmap
            ) {

                this.applyDreamlandPixelFilter();
            }
        };


    // =========================================================
    // 캐릭터 크기
    // =========================================================

    const _Sprite_Character_update =
        Sprite_Character.prototype.update;


    Sprite_Character.prototype.update =
        function() {

            _Sprite_Character_update.call(
                this
            );


            const scale =
                this.dreamlandCharacterScale();


            // ---------------------------------------------
            // 스케일 적용
            //
            // Sprite_Character의 anchor는 기본적으로
            // x = 0.5
            // y = 1.0
            //
            // 따라서 발 위치를 기준으로 확대됨.
            // 맵 좌표에는 영향을 주지 않음.
            // ---------------------------------------------

            this.scale.x =
                scale;


            this.scale.y =
                scale;
        };


})();