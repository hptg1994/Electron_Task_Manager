const electron = require("electron");
const { Tray,app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath,mainWindow){
    super(iconPath);
    this.mainWindow = mainWindow;
    this.setToolTip("Timer App")
    this.on("click",this.onClick.bind(this));
    this.on("right-click",this.onRightClick);
  }

  onClick(event, bounds) {
    //  click position x,y coordinate
    const { x, y } = bounds;

    //  Main window height and width
    const { height, width } = this.mainWindow.getBounds();
    this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPostion = process.platform === "darwin" ? y+30 : y - height
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPostion,
        height: height,
        width: width

      });
      this.mainWindow.show()
    }
  }

  onRightClick(){
    const menuConfig = Menu.buildFromTemplate([
      {
        label:"Quit",
        click:() => app.quit()
      }
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;


