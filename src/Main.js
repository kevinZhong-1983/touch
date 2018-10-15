window.A2xExtend=__extends;
window.addEventListener("load",function(){
    annie.debug=false;
    var stage=new annie.Stage("annieEngine",640,1136,24,annie.StageScaleMode.FIXED_HEIGHT,0);
    //默认关闭自动旋转和自动resize
    //stage.autoResize=true;
    //stage.autoSteering=true;
    stage.isMultiTouch=true
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

                    copy_mc.x=stage.desWidth/2-283/2
                    copy_mc.y=stage.desHeight/2-400/2
                    copy_mc.tt.text=myNum+1
                    copy_arr.push(copy_mc)
                    even_Fun(temp)

                    temp++

                }


                function even_Fun(n){


            	    stage.addEventListener(annie.TouchEvent.ON_MULTI_TOUCH,onTouch)

                    function onTouch(e){

            	        console.log(e.rotate)

            	        copy_arr[n].rotation+=e.rotate
                        copy_arr[n].scaleX+=e.scale
                        copy_arr[n].scaleY+=e.scale



                    }




                }








            }
        });
    })
});