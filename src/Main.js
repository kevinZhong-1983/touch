window.A2xExtend=__extends;
window.addEventListener("load",function(){
    annie.debug=false;
    var stage=new annie.Stage("annieEngine",640,1136,24,annie.StageScaleMode.FIXED_WIDTH,0);
    //默认关闭自动旋转和自动resize
    //stage.autoResize=true;
    //stage.autoSteering=true;

    stage.addEventListener(annie.Event.ON_INIT_STAGE,function (e) {
    	//想要同时加载多个场景的话，Annie2x.loadScene的第一个参数可以传数组如 ["scene1","scene2",...]
        annie.loadScene("a2x",function(per){
            //加载进度
            trace("加载进度:"+per+"%");
        },function(result){
            //加载完成 result 里包含了当前加载完成的是哪个场景序号，以及总加载场景数有多少，所以
            //需要同时加载多个模块时可以判断已经加载好的后直接出内容，其他偷偷在后台加载
            if(result.sceneId==result.sceneTotal){

            	stage.addChild(new a2x.A2x());

            	var mc_arr=[]
                var copy_arr=[]
                var temp=0

            	function init(){

                    for (var i = 0; i < 2; i++) {
                        for (var j = 0; j < 5; j++) {
                            var mc = new a2x.MC1()
                            mc.x += j * 117 + 35;
                            mc.y += i * 117 + 880;
                            stage.addChild(mc);
                            mc_arr.push(mc)
                        }
                    }

                    for (var t=0;t<10;t++){

                        mc_arr[t].tt.text=t+1
                        mc_arr[t].addEventListener(annie.MouseEvent.MOUSE_DOWN,onD)

                    }



                }

                init()//初始化

                function onD(e){

            	    var myNum=mc_arr.indexOf(e.currentTarget)
            	   // console.log(myNum)

                    var copy_mc=new a2x.MC2()
                    stage.addChild(copy_mc)

                    copy_mc.x=stage.desWidth/2
                    copy_mc.y=stage.desHeight/2
                    copy_mc.drag_mc.tt.text=myNum+1
                    copy_arr.push(copy_mc)

                    // stage.isMultiTouch=true
                    // stage.addEventListener(annie.TouchEvent.ON_MULTI_TOUCH,function(e){
                    //
                    //     copy_mc.rotation+=e.rotate
                    //     copy_mc.scaleX+=e.scale
                    //     copy_mc.scaleY+=e.scale
                    //
                    // })
                    event_Fun(temp)
                    temp++
                }

                function event_Fun(n){


                    copy_arr[n].drag_mc.addEventListener(annie.MouseEvent.MOUSE_DOWN,move_C)
                    copy_arr[n].btn_mc.scale_btn.addEventListener(annie.MouseEvent.MOUSE_DOWN,scale_C)
                    copy_arr[n].btn_mc.rota_btn.addEventListener(annie.MouseEvent.MOUSE_DOWN,rota_C)
                    copy_arr[n].btn_mc.clean_btn.addEventListener(annie.MouseEvent.MOUSE_DOWN,clean_C)



                    //drag

                    function move_C(e){

                        event_type="move"
                        //
                        //
                        copy_arr[n].btn_mc.scale_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,scale_C)
                        copy_arr[n].btn_mc.rota_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,rota_C)
                        copy_arr[n].btn_mc.clean_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,clean_C)

                        stage.addEventListener(annie.MouseEvent.MOUSE_MOVE,scale_M)
                        stage.addEventListener(annie.MouseEvent.MOUSE_UP,scale_U)


                    }


                    //scale
                    function scale_C(e){

                        event_type="scale"
                        tempx=e.stageX

                        copy_arr[n].drag_mc.removeEventListener(annie.MouseEvent.MOUSE_DOWN,move_C)
                        copy_arr[n].btn_mc.rota_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,rota_C)
                        copy_arr[n].btn_mc.clean_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,clean_C)


                        stage.addEventListener(annie.MouseEvent.MOUSE_MOVE,scale_M)
                        stage.addEventListener(annie.MouseEvent.MOUSE_UP,scale_U)

                    }


                    //move

                    function scale_M(e){


                        console.log(event_type)

                        if(event_type=='move'){

                            copy_arr[n].x=e.stageX
                            copy_arr[n].y=e.stageY


                        }else if(event_type=='scale'){

                            scale_Num=(e.stageX-tempx)/10000

                            if(copy_arr[n].scaleX<0.2){

                                copy_arr[n].scaleX=0.2
                                copy_arr[n].scaleY=0.2

                            }else{

                                copy_arr[n].scaleX+=scale_Num
                                copy_arr[n].scaleY+=scale_Num

                            }

                            //console.log(copy_arr[n].scaleX)



                        }else if(event_type=='rotate'){





                        }else{



                        }




                    }


                    //mouse_UP

                    function scale_U(e){

                        event_type=""
                       stage.removeEventListener(annie.MouseEvent.MOUSE_MOVE,scale_M)
                       stage.removeEventListener(annie.MouseEvent.MOUSE_UP,scale_U)
                       copy_arr[n].drag_mc.addEventListener(annie.MouseEvent.MOUSE_DOWN,move_C)
                       copy_arr[n].btn_mc.scale_btn.addEventListener(annie.MouseEvent.MOUSE_DOWN,scale_C)
                       copy_arr[n].btn_mc.rota_btn.addEventListener(annie.MouseEvent.MOUSE_DOWN,rota_C)
                        copy_arr[n].btn_mc.clean_btn.addEventListener(annie.MouseEvent.MOUSE_DOWN,clean_C)


                    }


                    //rotate

                    function rota_C(e){

                        event_type="rotate"
                        copy_arr[n].drag_mc.removeEventListener(annie.MouseEvent.MOUSE_DOWN,move_C)
                        copy_arr[n].btn_mc.scale_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,scale_C)
                        copy_arr[n].btn_mc.clean_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,clean_C)

                        stage.addEventListener(annie.MouseEvent.MOUSE_MOVE,scale_M)
                        stage.addEventListener(annie.MouseEvent.MOUSE_UP,scale_U)

                    }


                    //clear
                    function clean_C(e){

                        event_type="clear"
                        stage.removeChild(copy_arr[n])
                        copy_arr[n].drag_mc.removeEventListener(annie.MouseEvent.MOUSE_DOWN,move_C)
                        copy_arr[n].btn_mc.scale_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,scale_C)
                        copy_arr[n].btn_mc.rota_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,rota_C)
                        copy_arr[n].btn_mc.clean_btn.removeEventListener(annie.MouseEvent.MOUSE_DOWN,clean_C)

                    }


                }





            }
        });
    })
});