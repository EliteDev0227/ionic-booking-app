import { Injectable } from "@angular/core";
import { Tools } from "../providers/tools";
import { Content, Gesture } from "ionic-angular";
/**
 * Created by shadow-viper on 1/19/18.
 */

@Injectable()
export class gridHelper {

    private ColSize: number = 15;
    private elementCount: number = 0;
    //   private  zoomConfig:any={};
    public isFinishAuth: boolean = false;
    public lastScale: number = 0;
    public gridHeight: number = 0;
    public headerSize: number = 91;
    private ElementSize: number = 10;
    private logicComputed: boolean = false;
    public gridWidth: number = 0;
    gridStyle: any = [];
    private SizeInfo = { width: 1200, height: 600, types: { baldaquin4: { width: 23, height: 12 }, umbrella4: { width: 13, height: 12 }, umbrella2: { width: 23, height: 12 } } }
    private cssConfiguration: { width_right_padding: number; width_left_padding: number; element_padding: 0; } = { width_right_padding: 0, width_left_padding: 0, element_padding: 0 };
    private supposedObjSize: number = (9 * 3);//we are looking for an object of 15mm
    ZoomData: any = { min_x: 0, min_y: 0, cord: true, x: 0, y: 0, last_x: 0, wave: [], gesture: [], elements: [], last_y: 0, header: [], scale: 1, base: 1, newScale: 0, content: [], el: [], ow: 0, oh: 0, original_x: [], original_y: [] }
    constructor(public tool: Tools) { }
    /*private pixelRatio(){
      return window.devicePixelRatio
    }*/
    private ScreenWidth() {
        return window.outerWidth - this.reduceWidth();
    }

    private reduceWidth() {
        return (this.cssConfiguration.width_left_padding + this.cssConfiguration.width_right_padding + (this.cssConfiguration.element_padding * 15 * 2));
    }
    /*
      private ScreenHeight(sub:number):any{
        return window.outerHeight-sub;
      }
    */

    private ElementRealSize() {
        return this.ElementSize;
    }

    public sizeLogic(Iheight?: number, Iwidth?: number) {
        if (!this.logicComputed) {
            for (let i in this.SizeInfo.types) {
                let type = i;
                let height = ((this.ScreenWidth() / (Iwidth / Iheight)) / (Iheight * (this.SizeInfo.types[type].height) / this.SizeInfo.height)) - 6;
                let width = (this.ScreenWidth() / (Iwidth * (this.SizeInfo.types[type].width) / this.SizeInfo.width)) - 6;

                if (height > this.supposedObjSize) {
                    let sizeRatio = width / height;
                    width = this.supposedObjSize * sizeRatio
                    height = this.supposedObjSize;
                }
                this.ElementSize = width
    
                this.gridStyle[i] = {
                    width: width + 'px',
                    height: height + 'px',
                    'min-width': width + 'px',
                    'min-height': height + 'px',
                    'max-height': height + 'px',
                    'max-width': width + 'px'
                };

            }
            this.logicComputed = true;
        }


    }
    /*
      private getNewElementCount(oldHeight:number,newHeight:number,oldCount:number){
        return (newHeight*oldCount)/oldHeight;
      } */

    private row(): number {
        return (this.elementCount % this.ColSize) > 0 ? parseInt((this.elementCount / this.ColSize).toString()) + 1 : (this.elementCount / this.ColSize);
    }

    public continueScaling = (scale: number): boolean => {
        return this.ElementRealSize() * scale < this.supposedObjSize;
    };


    public RowCol() {
        return { row: this.row(), col: this.ColSize };
    }


    public fill(length: number) {
        this.elementCount = length;
    }

    //   storeConfig(config){
    //     this.zoomConfig=JSON.parse(JSON.stringify(config))
    //   }

    resetZoom() {
        this.ZoomData = { min_x: 0, min_y: 0, cord: true, x: 0, y: 0, last_x: 0, wave: [], gesture: [], elements: [], last_y: 0, header: [], scale: 1, base: 1, newScale: 0, content: [], el: [], ow: 0, oh: 0, original_x: [], original_y: [] }
    }

    public autoZoom() {
        let totalScale = this.supposedObjSize / this.ElementRealSize();
        let increment = ((totalScale - 1) / 50)
        let i = 0;
        let intervalInstance: any = setInterval(() => {
            this.ZoomData.scale += increment;
            if (this.continueScaling(this.ZoomData.scale)) {
                this.setBounds();
                this.transform();

            } else {
                this.ZoomFinished(intervalInstance)
            }
            i++;
            if (i >= 50) {
                this.ZoomData.base = this.ZoomData.scale;
                this.ZoomFinished(intervalInstance)
            }
        }, 20)

    }

    private ZoomFinished(intervalInstance: any) {
        clearInterval(intervalInstance);
        this.pinchZoom();
        this.onPanend();
    }
    public getFactor(cord: number, axis: string) {
        //if grid height with a cord of y to a known axis
        //then get device height with y to an unknown axis
        if (axis == 'y') {
            return ((cord * (this.ScreenWidth() / (this.gridWidth / this.gridHeight))) / (this.gridHeight))
        } else if (axis == 'x') {
            return (cord * this.ScreenWidth()) / this.gridWidth
        }
    }

    public initializeZoom(el: HTMLElement, content: Content, header: HTMLElement, elements: HTMLElement, wave: HTMLElement) {
        // max translate x = (container_width - element absolute_width)px
        // max translate y = (container_height - element absolute_height)px
        this.ZoomData.el = el;
        this.ZoomData.content = content;
        this.ZoomData.header = header;
        this.ZoomData.wave = wave;
        this.ZoomData.elements = elements;
        for (let i = 0; i < this.ZoomData.el.children.length; i++) {
            let c = <HTMLElement>this.ZoomData.el.children.item(i);
            this.ZoomData.ow = c.offsetWidth;
            this.ZoomData.oh += c.offsetHeight;
        }


        this.ZoomData.original_x = this.ZoomData.content.contentWidth - this.ZoomData.ow;
        this.ZoomData.original_y = this.ZoomData.content.contentHeight - this.headerSize - this.ZoomData.oh;


        this.ZoomData.max_x = this.ZoomData.original_x;
        this.ZoomData.max_y = this.ZoomData.original_y;

    }

    private pinchZoom(): void {
        this.isFinishAuth = true;
        
        this.ZoomData.gesture = new Gesture(this.ZoomData.el);
        this.ZoomData.gesture.listen();
        this.ZoomData.gesture.on('pan', (evt) => { this.onPan(evt); });
        this.ZoomData.gesture.on('panend', (evt) => { this.onPanend(); });
        this.ZoomData.gesture.on('pancancel', (evt) => { this.onPanend(); });
        // _gesture.on('tap', (ev)=>{this.onTap(ev);});
        //  this.ZoomData.gesture.on('pinch', (ev)=>{this.onPinch(ev);})
        // this.ZoomData.gesture.on('pinchend', (ev)=>{this.onPinchend(ev);});
        // this.ZoomData.gesture.on('pinchcancel', (ev)=>{this.onPinchend(ev);})
    }
    public onPanend() {
        // remembers previous position to continue panning.
        this.ZoomData.last_x = this.ZoomData.x;
        this.ZoomData.last_y = this.ZoomData.y;
    }
    onTap(ev) {
        if (ev.tapCount === 2) {
            let reset = false;
            this.ZoomData.scale += .5;
            if (this.ZoomData.scale > 2) {
                this.ZoomData.scale = 1;
                reset = true;
            }
            this.setBounds();
            reset ? this.transform(this.ZoomData.max_x / 2, this.ZoomData.max_y / 2) : this.transform();
        }
    }
    /*private onPinch(ev) {
      // formula to append scale to new scale
       this.ZoomData.newScale=this.ZoomData.base + (ev.scale * this.ZoomData.scale - this.ZoomData.scale)/this.ZoomData.scale;
       this.ZoomData.newScale=this.ZoomData.newScale<1?1:this.ZoomData.newScale;
       this.ZoomData.scale = this.continueScaling(this.ZoomData.newScale)?this.ZoomData.newScale:this.ZoomData.scale;
  
       this.setBounds();
       this.transform();
    }
  
    private onPinchend(ev) {
       if (this.ZoomData.scale > 4) {
       this.ZoomData.scale = 4;
       }
       if (this.ZoomData.scale < 1) {
       this.ZoomData.scale = 1;
       }
       // lets pinch know where the new base will start
       this.ZoomData.base = this.ZoomData.scale;
      this.setBounds();
       // transform();
  
    }
  */
    //   private setY(Y:number){
    //     this.ZoomData.y=Y;
    //   }
    private setCoor(xx: number, yy: number, isPan?: boolean, type?: string) {
        this.ZoomData.x = Math.min(Math.max((this.ZoomData.last_x + xx), this.ZoomData.max_x), this.ZoomData.min_x);
        this.ZoomData.y = Math.min(Math.max((this.ZoomData.last_y + yy), this.ZoomData.max_y), (this.ZoomData.min_y));
        this.alignHeader();
    }

    alignHeader() {
        if ((this.ZoomData.elements.getBoundingClientRect().top - 3) < (this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight - 3) && this.ZoomData.elements.getBoundingClientRect().top > this.ZoomData.header.offsetHeight - 3) {
            if (this.ZoomData.elements.getBoundingClientRect().top > this.ZoomData.header.offsetHeight) {
                this.ZoomData.wave.style.webkitTransform = `translateY(${-(this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight - this.ZoomData.elements.getBoundingClientRect().top)}px) scale3d(1,1, 1)`;
          
            }
        } else if (this.ZoomData.elements.getBoundingClientRect().top < this.ZoomData.header.offsetHeight) {
            this.ZoomData.wave.style.webkitTransform = `translateY(${-(this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight + 10)}px) scale3d(1,1, 1)`;
        } else if (this.ZoomData.elements.getBoundingClientRect().top > (this.ZoomData.header.offsetHeight + this.ZoomData.wave.offsetHeight)) {
            this.ZoomData.wave.style.webkitTransform = `translateY(0px) scale3d(1,1, 1)`;
        }
    }
    transform(xx?: number, yy?: number) {
        this.ZoomData.el.style.webkitTransform = `translate3d(${xx || this.ZoomData.x}px, ${yy || this.ZoomData.y}px, 0) scale3d(${this.ZoomData.scale}, ${this.ZoomData.scale}, 1)`;
    }
    private setBounds() {

        let scaled_x = Math.ceil((this.ZoomData.el.offsetWidth * this.ZoomData.scale - this.ZoomData.el.offsetWidth) / 2);
        let scaled_y = Math.ceil((this.ZoomData.el.offsetHeight * this.ZoomData.scale - this.ZoomData.el.offsetHeight) / 2);
        let overflow_x = Math.ceil(this.ZoomData.original_x * this.ZoomData.scale - this.ZoomData.original_x); // returns negative
        let overflow_y = Math.ceil(this.ZoomData.oh * this.ZoomData.scale - this.ZoomData.oh);

        this.ZoomData.max_x = this.ZoomData.original_x - scaled_x + overflow_x;
        this.ZoomData.min_x = 0 + scaled_x;
        this.ZoomData.max_y = this.ZoomData.original_y - scaled_y + overflow_y;
        this.ZoomData.min_y = 0 + scaled_y;
        this.alignHeader();
        this.setCoor(0, scaled_y);
    }
    public onPan(ev) {
        this.setCoor(ev.deltaX, ev.deltaY);
        this.transform();
    }
}
