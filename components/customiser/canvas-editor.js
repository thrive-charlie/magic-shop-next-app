export default class CanvasEditor {
    constructor() {
      this.contextOpen = false;
      this.currentShape = null;
      this.menuPosition = { x: 0, y: 0 };
      this.hasInit = false;
      this.textInput = null;
      this.stage = null;
      this.transformer = null;
      this.layer = null;
      this.x1 = null;
      this.y1 = null;
      this.x2 = null;
      this.y2 = null;
      this.selectionRectangle = null;
    }
  
    initCanvas() {
      this.stage = new Konva.Stage({
        container: "container",
        width: 800,
        height: 600,
      });
  
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
  
      this.transformer = new Konva.Transformer();
      this.layer.add(this.transformer);
  
      this.selectionRectangle = new Konva.Rect({
        fill: "rgba(0,0,255,0.5)",
        padding: "10px",
        visible: true,
      });
      this.layer.add(this.selectionRectangle);
  
      this.stage.on("mousedown touchstart", (e) => {
        if (e.target !== this.stage) {
          return;
        }
        e.evt.preventDefault();
        this.x1 = this.stage.getPointerPosition().x;
        this.y1 = this.stage.getPointerPosition().y;
        this.x2 = this.stage.getPointerPosition().x;
        this.y2 = this.stage.getPointerPosition().y;
  
        this.selectionRectangle.visible(true);
        this.selectionRectangle.width(0);
        this.selectionRectangle.height(0);
      });
  
      this.stage.on("mousemove touchmove", (e) => {
        if (!this.selectionRectangle.visible()) {
          return;
        }
        e.evt.preventDefault();
        this.x2 = this.stage.getPointerPosition().x;
        this.y2 = this.stage.getPointerPosition().y;
  
        this.selectionRectangle.setAttrs({
          x: Math.min(this.x1, this.x2),
          y: Math.min(this.y1, this.y2),
          width: Math.abs(this.x2 - this.x1),
          height: Math.abs(this.y2 - this.y1),
        });
      });
  
      this.stage.on("mouseup touchend", (e) => {
        if (!this.selectionRectangle.visible()) {
          return;
        }
        e.evt.preventDefault();
        setTimeout(() => {
          this.selectionRectangle.visible(false);
        });
  
        const shapes = this.stage.find(".image");
        const box = this.selectionRectangle.getClientRect();
        const selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        this.transformer.nodes(selected);
      });
  
      this.stage.on("click tap", (e) => {
        if (this.selectionRectangle.visible()) {
          return;
        }
  
        if (e.target === this.stage) {
          this.transformer.nodes([]);
          return;
        }
  
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;
  
        if (!metaPressed && !isSelected) {
          this.transformer.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          const nodes = this.transformer.nodes().slice();
          nodes.splice(nodes.indexOf(e.target), 1);
          this.transformer.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          const nodes = this.transformer.nodes().concat([e.target]);
          this.transformer.nodes(nodes);
        }
      });
  
      window.addEventListener("click", () => {
        this.contextOpen = false;
      });
  
      this.stage.on("contextmenu", (e) => {
        e.evt.preventDefault();
        if (e.target === this.stage) {
          return;
        }
  
        this.menuPosition = { x: this.x, y: this.y };
        this.currentShape = e.target;
        this.contextOpen = true;
      });
  
      this.hasInit = true;

      console.log(this);

    }
  
    drawImage(src) {
      Konva.Image.fromURL(src, (img) => {
        img.setAttrs({
          x: 80,
          y: 100,
          name: "image",
          draggable: true,
          scale: { x: 0.5, y: 0.5 },
        });
  
        this.layer.add(img);
  
        img.on("transform", () => {
          img.setAttrs({
            scaleX: 1,
            scaleY: 1,
            width: img.width() * img.scaleX(),
            height: img.height() * img.scaleY(),
          });
        });
      });
    }
  
    addImage() {
      const src = "/custom/test.jpg";
      this.drawImage(src);
    }
  
    exportCanvas() {
      const dataURL = this.stage.toDataURL({ pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = "Export.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  
    addText(text) {

      const complexText = new Konva.Text({
        x: 20,
        y: 60,
        text: text,
        fontSize: 32,
        fontFamily: "Calibri",
        fill: "#A00",
        width: 300,
        padding: 20,
        draggable: true,
      });

      this.layer.add(complexText);
  
      complexText.on("transform", () => {
        complexText.setAttrs({
          width: complexText.width() * complexText.scaleX(),
          scaleX: 1,
        });
      });
  
      this.stage.add(this.layer);
    }
  }
  