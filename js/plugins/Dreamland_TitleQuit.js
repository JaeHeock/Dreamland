/*:
 * @target MZ
 * @plugindesc 타이틀 화면에 "나가기" 커맨드를 추가합니다.
 * @author OpenAI
 *
 * @help
 * RPG Maker MZ 기본 타이틀 메뉴에
 * "나가기" 명령을 추가합니다.
 *
 * MOG_TitleCommands.js 사용 시:
 *
 * Command_0.png = 입장하기
 * Command_1.png = 이어하기
 * Command_2.png = 설정
 * Command_3.png = 나가기
 */

(() => {
    "use strict";

    // 타이틀 메뉴에 "나가기" 추가
    const _Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;

    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);

        this.addCommand("나가기", "quit");
    };


    // 나가기 명령 연결
    const _Scene_Title_createCommandWindow =
        Scene_Title.prototype.createCommandWindow;

    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);

        this._commandWindow.setHandler(
            "quit",
            this.commandDreamlandQuit.bind(this)
        );
    };


    // 실제 게임 종료
    Scene_Title.prototype.commandDreamlandQuit = function() {
        this._commandWindow.close();
        SceneManager.exit();
    };

})();