// Main
console.log("Hello EnchantJS!!");
 
 
   //回転　＝ rotation
   //反転　＝ scale(-1, 1)
   //Ref = 90度反射
   //Rer = 反射　回転式
   //hcT = ハック対象
   //角度計算方法 
   //      入射角 - 物体の角度
 
 
 
var assets = [
    "images/l_origin.png",
    "images/hc_back.png",
    "images/hc_r2.png",
    "images/hc_r.png",
    "images/hc_T.png",
    "images/hc_nt.png",
    "images/hc_st.png",
    "images/ball.png",
    "images/caunto.png",
    "images/hc_title.png",
    "images/pc.png",
    "images/hc_play.png",
    "images/mode.png",
    "images/yazirusi.png",
    "images/yazirusi2.png",
    "images/back.png",
    "images/yazirusi3.png",
    "images/title.png",// CodeFriendsタイトル
];
 

function gameStart(){// ゲーム画面
    scene = gameManager.createGameScene();
    core.replaceScene(scene); core.resume();
 
    //==========
    // ここから
    //==========

    //背景
    var back = new ExSprite(320, 320);
    back.image = core.assets["images/hc_back.png"];
    scene.addChild(back);

    var RefGroup = new Group();
    scene.addChild(RefGroup);
    
    var BariaGroup = new Group();
    scene.addChild(BariaGroup);

    var targetGroup = new Group();
    scene.addChild(targetGroup);

    var hcNTGroup = new Group();
    scene.addChild(hcNTGroup);
    
    //壁
    var baria = new Sprite(320,  10);
    baria.backGroundColor = "black";
    baria.x = 0;
    baria.y = 0;
    baria.tag = "b";
    BariaGroup.addChild(baria);

    var baria2 = new Sprite(10,  480);
    baria.backGroundColor = "black";
    baria2.x = 320 - 10;
    baria2.y = 0;
    baria2.tag = "b";
    BariaGroup.addChild(baria2);

    var baria3 = new Sprite(320,  10);
    baria3.backGroundColor = "black";
    baria3.x = 0;
    baria3.y = 320 - 10;
    baria3.tag = "b";
    BariaGroup.addChild(baria3);

    var baria4 = new Sprite(10,  480);
    baria4.backGroundColor = "black";
    baria4.x = 0;
    baria4.y = 0;
    baria4.tag = "b";
    BariaGroup.addChild(baria4);


    var ballGroup = new Group();
    scene.addChild(ballGroup);

    scene.tl.delay(8);
    scene.tl.then(function(){
        //弾
            var ball = new ExSprite(9, 9);
            ball.image = core.assets["images/ball.png"];
            ball.x = origin.x + 11.5;
            ball.y = 320 - 41;
            ball.vX = 0;
            ball.vY = -10;
            ball.angle = 0;
            ballGroup.addChild(ball);

        ball.addEventListener(Event.ENTER_FRAME, function(){
                ball.x += ball.vX;
                ball.y += ball.vY;
            });

            ball.addCollision(BariaGroup);
            ball.addCollision(RefGroup);
            ball.addCollision(targetGroup);
            ball.addCollision(hcNTGroup);
            ball.addEventListener(Event.COLLISION, function(e){
               console.log("hit:" + e.collision.target.tag);
               if(e.collision.target.tag == "b"){
                ball.remove();
               }

               if(e.collision.target.tag == "r"){;
                  if(this.vX == 0 && this.vY < 0){
                    changeVector(ball, 8, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z); 
                    //console.log("hit");
                  }

                  else if(this.vX == 0 && this.vY > 0){
                    changeVector(ball, 8, 180-(-180 - -90 - e.collision.target.z) + e.collision.target.z); 
                  }

                  else if(this.vX > 0 && this.vY == 0){
                    changeVector(ball, 8, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z - 90); 
                  }
                  else if(this.vX < 0 && this.vY == 0){
                    changeVector(ball, 8, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z + 90); 

                  }
               }
               if(e.collision.target.tag == "t"){
                if(e.collision.target.hp == 0){
                    e.collision.target.remove();
                    e.collision.target.c -= 1;

                    if(e.collision.target.c == 0){
                      var clearLabel = new Label();
                      clearLabel.text = "GAME CLIAR";
                      clearLabel.height = 0;
                      clearLabel.x = 80;
                      clearLabel.y = 100;
                      clearLabel.color = "white";
                      clearLabel.textAlign = "left";
                      clearLabel.font = "32px 'PixelMplus10'";
                      scene.addChild(clearLabel);
                      /* 
                      for(var i=0; i<ballGroup.childNodes.length; i++){
                        console.log(i);
                        ballGroup.childNodes[i].removeEventListener(Event.ENTER_FRAME);
                      }
                      */
                      scene.tl.clear();
                      tLabel.tl.clear();

                      var clearLabel2 = new Label();
                      clearLabel2.text = "BACK TO TITLE";
                      clearLabel2.height = 0;
                      clearLabel2.x = 110;
                      clearLabel2.y = 200;
                      clearLabel2.color = "white";
                      clearLabel2.textAlign = "left";
                      clearLabel2.font = "16px 'PixelMplus10'";
                      scene.addChild(clearLabel2);

                      clearLabel2.addEventListener(Event.TOUCH_START, function(){
                         core.popScene();
                      });
                    }
                }
                e.collision.target.hp -= 1;
                ball.remove();
                e.collision.target.tl.scaleTo(0.7, 1);
                e.collision.target.tl.scaleTo(1, 1)
               }

               if(e.collision.target.tag == "nt"){
                if(e.collision.target.hp == 0){
                    e.collision.target.remove();
                    caunto.frame += 1; 
                    if(caunto.frame  == 3){
                      tLabel.tl.clear();
                      scene.tl.clear();
            
                      var outLabel = new Label();
                      outLabel.text = "GAME OVER";
                      outLabel.height = 0;
                      outLabel.x = 90;
                      outLabel.y = 100;
                      outLabel.color = "red";
                      outLabel.textAlign = "left";
                      outLabel.font = "32px 'PixelMplus10'";
                      scene.addChild(outLabel); 
            
                      var outLabel2 = new Label();
                      outLabel2.text = "BACK TO TITLE";
                      outLabel2.height = 0;
                      outLabel2.x = 110;
                      outLabel2.y = 200;
                      outLabel2.color = "red";
                      outLabel2.textAlign = "left";
                      outLabel2.font = "16px 'PixelMplus10'";
                      scene.addChild(outLabel2);

                      outLabel2.addEventListener(Event.TOUCH_START, function(){
                         core.popScene();
                      });
                    }
                }
                e.collision.target.hp -= 1;
                ball.remove();
                e.collision.target.tl.scaleTo(0.7, 1);
                e.collision.target.tl.scaleTo(1, 1)
               }
            });     
    });
    scene.tl.loop();

    

    // 光元
    var origin = new ExSprite(32, 32);
    origin.image = core.assets["images/l_origin.png"];
    origin.x = 10;
    origin.y = 320 - 32;
    scene.addChild(origin);


    function changeVector(spr, spd, deg){
        spr.vX = spd * Math.cos(Math.PI / 180 * deg);
        spr.vY = spd * Math.sin(Math.PI / 180 * deg);
    }




    //カウント
    var caunto = new ExSprite(96, 32);
    caunto.image = core.assets["images/caunto.png"];
    caunto.x = 285 - (96*0.5);
    caunto.y = 50 - (32*0.5);
    caunto.scale(0.5, 0.5);
    scene.addChild(caunto);

    //時間
    var time = 180;
    var tLabel = new Label();
    tLabel.width = 100;
    tLabel.x = 260;
    tLabel.y = 12;
    tLabel.text = time;
    tLabel.color = "lightblue";
    tLabel.font = "32px 'PixelMplus10'";
    tLabel.textAlign = "left";
    scene.addChild(tLabel);
 
    tLabel.tl.delay(16);
    tLabel.tl.then(function(){
        time -= 1;
        tLabel.text = time;
        if(time <= 0){
            tLabel.tl.clear();
            scene.tl.clear();
            
            var outLabel = new Label();
            outLabel.text = "GAME OVER";
            outLabel.height = 0;
            outLabel.x = 90;
            outLabel.y = 100;
            outLabel.color = "red";
            outLabel.textAlign = "left";
            outLabel.font = "32px 'PixelMplus10'";
            scene.addChild(outLabel);

            var outLabel2 = new Label();
            outLabel2.text = "BACK TO TITLE";
            outLabel2.height = 0;
            outLabel2.x = 110;
            outLabel2.y = 200;
            outLabel2.color = "red";
            outLabel2.textAlign = "left";
            outLabel2.font = "16px 'PixelMplus10'";
            scene.addChild(outLabel2);

            outLabel2.addEventListener(Event.TOUCH_START, function(){
               core.popScene();
            });
        } 
    });
    tLabel.tl.loop();
  

      function Ref(x, y){
        //90度反射
        var Ref = new ExSprite(32, 32);
        Ref.image = core.assets["images/hc_r2.png"];
        Ref.scale(1, -1);
        Ref.x = x;
        Ref.y = y;
        scene.addChild(Ref);
        
        //反射板
        var Line = new Sprite(32, 0);
        Line.backgroundColor = "red";
        Line.x = Ref.x + 3;
        Line.y = Ref.y + 15;
        Line.z = -45;
        Line.rotation = -45;
        Line.tag = "r";
        RefGroup.addChild(Line);
    }

    function Rer(x, y){
        //反射　回転式
        var Rer = new ExSprite(32, 32);
        Rer.image = core.assets["images/hc_r.png"];
        Rer.x = x;
        Rer.y = y;
        //Rer.rotation = z;
        scene.addChild(Rer);

        //反射板
        var Line2 = new Sprite(32, 5);
        Line2.backgroundColor = "white";
        Line2.x = x;
        Line2.y = y + 32 / 2 - 2.5;
        Line2.z = 0;
        Line2.rotation = 0;
        Line2.tag = "r";
        RefGroup.addChild(Line2);

        // 回転
        Rer.addEventListener(Event.TOUCH_START, function(){ 
            Rer.rotation += 5;
            if(Line2.z == 180){
                Line2.z = 0;
            }else{
                Line2.z += 5;
                Line2.rotation += 5;
                console.log(Line2.z);
            }
    });
    }

    function hcT(x, y){
       //ハック対象
       var hcT = new ExSprite(32, 32);
       hcT.image = core.assets["images/hc_T.png"];
       hcT.x = x;
       hcT.y = y;
       hcT.hp = 7;
       hcT.tag = "t";
       targetGroup.addChild(hcT);
       hcT.c = 0;
       hcT.c += 1;
    }

    function hcNT(x, y){
    //ハック非対象
    var hcNT = new ExSprite(32, 32);
    hcNT.image = core.assets["images/hc_nt.png"];
    hcNT.x = x;
    hcNT.y = y;
    hcNT.hp = 3;
    hcNT.tag = "nt";
    hcNTGroup.addChild(hcNT);
    }

    Ref(10, 10);
    Rer(200, 10);
    hcT(200, 200);
    hcNT(100, 10);
    hcNT(250, 200);
    hcNT(150, 200);

}









function gameStart2(){// ゲーム画面
    scene = gameManager.createGameScene();
    core.replaceScene(scene); core.resume();
 
    //==========
    // ここから
    //==========

    //背景
    var back = new ExSprite(320, 320);
    back.image = core.assets["images/hc_back.png"];
    scene.addChild(back);

    var RefGroup = new Group();
    scene.addChild(RefGroup);
    
    var BariaGroup = new Group();
    scene.addChild(BariaGroup);

    var targetGroup = new Group();
    scene.addChild(targetGroup);

    var hcNTGroup = new Group();
    scene.addChild(hcNTGroup);
    
    //壁
    var baria = new Sprite(320,  10);
    baria.backGroundColor = "black";
    baria.x = 0;
    baria.y = 0;
    baria.tag = "b";
    BariaGroup.addChild(baria);

    var baria2 = new Sprite(10,  480);
    baria.backGroundColor = "black";
    baria2.x = 320 - 10;
    baria2.y = 0;
    baria2.tag = "b";
    BariaGroup.addChild(baria2);

    var baria3 = new Sprite(320,  10);
    baria3.backGroundColor = "black";
    baria3.x = 0;
    baria3.y = 320 - 10;
    baria3.tag = "b";
    BariaGroup.addChild(baria3);

    var baria4 = new Sprite(10,  480);
    baria4.backGroundColor = "black";
    baria4.x = 0;
    baria4.y = 0;
    baria4.tag = "b";
    BariaGroup.addChild(baria4);


    var ballGroup = new Group();
    scene.addChild(ballGroup);

    scene.tl.delay(8);
    scene.tl.then(function(){
        //弾
            var ball = new ExSprite(9, 9);
            ball.image = core.assets["images/ball.png"];
            //ball.x = 32/2-4.5+10;
            ball.x = 30;
            ball.y = 320 - 41;
            ball.vX = 0;
            ball.vY = -10;
            ball.angle = 0;
            ballGroup.addChild(ball);

        ball.addEventListener(Event.ENTER_FRAME, function(){
                ball.x += ball.vX;
                ball.y += ball.vY;
            });

            ball.addCollision(BariaGroup);
            ball.addCollision(RefGroup);
            ball.addCollision(targetGroup);
            ball.addCollision(hcNTGroup);
            ball.addEventListener(Event.COLLISION, function(e){
               //console.log("hit:" + e.collision.target.tag);
               if(e.collision.target.tag == "b"){
                ball.remove();
               }

               if(e.collision.target.tag == "r"){
                 console.log("hit");



                  if(this.vX == 0 && this.vY < 0){
                    changeVector(ball, 10, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z); 
                    //console.log();

                  }

                  else if(this.vX == 0 && this.vY > 0){
                    //console.log("hitwwwww");
                    changeVector(ball, 10, 180-(-180 - -90 - e.collision.target.z) + e.collision.target.z); 
                    //ball.vX = 8 * Math.cos(Math.PI / 180 * 180-(-180 - -90 - e.collision.target.z) + e.collision.target.z);

                  }

                  else if(this.vX > 0 && this.vY == 0){
                    changeVector(ball, 10, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z - 90);
                    //console.log("hit!!"); 
                  }
                  else if(this.vX < 0 && this.vY == 0){
                    changeVector(ball, 10, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z + 90); 

                  }
               }
               if(e.collision.target.tag == "t"){
                if(e.collision.target.hp == 0){
                    clearcounter -= 1;
                    console.log(e.collision.target);
                    e.collision.target.remove();

                    if(clearcounter == 0){
                      var clearLabel = new Label();
                      clearLabel.text = "GAME CLIAR";
                      clearLabel.height = 0;
                      clearLabel.x = 80;
                      clearLabel.y = 100;
                      clearLabel.color = "white";
                      clearLabel.textAlign = "left";
                      clearLabel.font = "32px 'PixelMplus10'";
                      scene.addChild(clearLabel);
                      
                      scene.tl.clear();
                      tLabel.tl.clear();

                      var clearLabel2 = new Label();
                      clearLabel2.text = "BACK TO TITLE";
                      clearLabel2.height = 0;
                      clearLabel2.x = 110;
                      clearLabel2.y = 200;
                      clearLabel2.color = "white";
                      clearLabel2.textAlign = "left";
                      clearLabel2.font = "16px 'PixelMplus10'";
                      scene.addChild(clearLabel2);

                      clearLabel2.addEventListener(Event.TOUCH_START, function(){
                         core.popScene();
                      });
                    }
                }
                e.collision.target.hp -= 1;
                ball.remove();
                e.collision.target.tl.scaleTo(0.7, 1);
                e.collision.target.tl.scaleTo(1, 1)
               }

               if(e.collision.target.tag == "nt"){
                if(e.collision.target.hp == 0){
                    e.collision.target.remove();
                    caunto.frame += 1; 
                    if(caunto.frame  == 3){
                      tLabel.tl.clear();
                      scene.tl.clear();
            
                      var outLabel = new Label();
                      outLabel.text = "GAME OVER";
                      outLabel.height = 0;
                      outLabel.x = 90;
                      outLabel.y = 100;
                      outLabel.color = "red";
                      outLabel.textAlign = "left";
                      outLabel.font = "32px 'PixelMplus10'";
                      scene.addChild(outLabel); 
            
                      var outLabel2 = new Label();
                      outLabel2.text = "BACK TO TITLE";
                      outLabel2.height = 0;
                      outLabel2.x = 110;
                      outLabel2.y = 200;
                      outLabel2.color = "red";
                      outLabel2.textAlign = "left";
                      outLabel2.font = "16px 'PixelMplus10'";
                      scene.addChild(outLabel2);

                      outLabel2.addEventListener(Event.TOUCH_START, function(){
                         core.popScene();
                      });
                    }
                }
                e.collision.target.hp -= 1;
                ball.remove();
                e.collision.target.tl.scaleTo(0.7, 1);
                e.collision.target.tl.scaleTo(1, 1)
               }
            });     
    });
    scene.tl.loop();

    

    // 光元
    var origin = new ExSprite(32, 32);
    origin.image = core.assets["images/l_origin.png"];
    origin.x = 32/2-16+10;
    origin.y = 320 - 32;
    scene.addChild(origin);


    function changeVector(spr, spd, deg){

       //console.log(Math.cos(Math.PI / 180 * deg));

        spr.vX = spd * (Math.cos(Math.PI / 180 * deg));
        spr.vX = Math.round(spr.vX*10)/10;
        spr.vY = spd * (Math.sin(Math.PI / 180 * deg));
        spr.vY = Math.round(spr.vY*10)/10;


        console.log("vx:" + spr.vX);
        console.log("vy:" + spr.vY);
        //console.log(deg);
    }



    //カウント
    var caunto = new ExSprite(96, 32);
    caunto.image = core.assets["images/caunto.png"];
    caunto.x = 285 - (96*0.5);
    caunto.y = 50 - (32*0.5);
    caunto.scale(0.5, 0.5);
    scene.addChild(caunto);

    //時間
    var time = 180;
    var tLabel = new Label();
    tLabel.width = 100;
    tLabel.x = 260;
    tLabel.y = 12;
    tLabel.text = time;
    tLabel.color = "lightblue";
    tLabel.font = "32px 'PixelMplus10'";
    tLabel.textAlign = "left";
    scene.addChild(tLabel);
 
    tLabel.tl.delay(16);
    tLabel.tl.then(function(){
        time -= 1;
        tLabel.text = time;
        if(time <= 0){
            tLabel.tl.clear();
            scene.tl.clear();
            
            var outLabel = new Label();
            outLabel.text = "GAME OVER";
            outLabel.height = 0;
            outLabel.x = 90;
            outLabel.y = 100;
            outLabel.color = "red";
            outLabel.textAlign = "left";
            outLabel.font = "32px 'PixelMplus10'";
            scene.addChild(outLabel);

            var outLabel2 = new Label();
            outLabel2.text = "BACK TO TITLE";
            outLabel2.height = 0;
            outLabel2.x = 110;
            outLabel2.y = 200;
            outLabel2.color = "red";
            outLabel2.textAlign = "left";
            outLabel2.font = "16px 'PixelMplus10'";
            scene.addChild(outLabel2);

            outLabel2.addEventListener(Event.TOUCH_START, function(){
               core.popScene();
            });
        } 
    });
    tLabel.tl.loop();
  

      function Ref(x, y, z){
        //90度反射
        var Ref = new ExSprite(32, 32);
        Ref.image = core.assets["images/hc_r2.png"];
        Ref.scale(1, -1);
        Ref.x = x;
        Ref.y = y;
        Ref.rotation = z;
        scene.addChild(Ref);
        
        //反射板
        var Line = new Sprite(32, 0);
        Line.backgroundColor = "red";
        Line.x = Ref.x + 3;
        Line.y = Ref.y + 15;
        Line.z = -45 + z;
        Line.rotation = -45 + z;
        Line.tag = "r";
        RefGroup.addChild(Line);
        
      }

    function Rer(x, y, z){
        //反射　回転式
        var Rer = new ExSprite(32, 32);
        Rer.image = core.assets["images/hc_r.png"];
        Rer.x = x;
        Rer.y = y;
        Rer.rotation = z;
        scene.addChild(Rer);

        //反射板
        var Line2 = new Sprite(32, 5);
        Line2.backgroundColor = "white";
        Line2.x = x;
        Line2.y = y + 32 / 2 - 2.5;
        Line2.z = z;
        Line2.rotation = z;
        Line2.tag = "r";
        RefGroup.addChild(Line2);

        // 回転
        Rer.addEventListener(Event.TOUCH_START, function(){ 
            
            if(Line2.z == 180 && Line2.z == -180){
                Line2.z = 0;
            }else if(Line2.z == 0){
                Line2.z += 15;
                Line2.rotation += 15;
                Rer.rotation += 15;
            }else if(Line2.z >= 0 && Line2.z > 0){
                Line2.z += 15;
                Line2.rotation += 15;
                Rer.rotation += 15;
            }else if(Line2.z <= 0 && Line2.z < 0){
                Line2.z -= 15;
                Line2.rotation -= 15;
                Rer.rotation -= 15;
            }
        });
    }
    
       
       var clearcounter = 0;

    function hcT(x, y){
       //ハック対象
       var hcT = new ExSprite(32, 32);
       hcT.image = core.assets["images/hc_T.png"];
       hcT.x = x;
       hcT.y = y;
       hcT.hp = 7;
       hcT.tag = "t";
       targetGroup.addChild(hcT);
       clearcounter += 1;
    }
       

    function hcNT(x, y){
    //ハック非対象
    var hcNT = new ExSprite(32, 32);
    hcNT.image = core.assets["images/hc_nt.png"];
    hcNT.x = x;
    hcNT.y = y;
    hcNT.hp = 3;
    hcNT.tag = "nt";
    hcNTGroup.addChild(hcNT);
    }

    
    Ref(220, 10, 90);
    Ref(10, 10, 0);
    Ref(220, 100, 180);
    Rer(70, 100, 45);
    Rer(70, 320-10-64, 45);
    Rer(320-10-32, 320-10-64, 45);
    hcT(70, 320-42);
    hcT(320-10-32, 100);
    hcT(32*5, 320-10-32*3);
    hcNT(320-10-32, 320-10-32);
    hcNT(70, 42);
    hcNT(320-10-64, 320-10-96);



    

}

    //==========
    // ここまで
    //==========


function gameStart3(){// ゲーム画面
    scene = gameManager.createGameScene();
    core.replaceScene(scene); core.resume();
 
    //==========
    // ここから
    //==========

    //背景
    var back = new ExSprite(320, 320);
    back.image = core.assets["images/hc_back.png"];
    scene.addChild(back);

    var RefGroup = new Group();
    scene.addChild(RefGroup);
    
    var BariaGroup = new Group();
    scene.addChild(BariaGroup);

    var targetGroup = new Group();
    scene.addChild(targetGroup);

    var hcNTGroup = new Group();
    scene.addChild(hcNTGroup);
    
    //壁
    var baria = new Sprite(320,  10);
    baria.backGroundColor = "black";
    baria.x = 0;
    baria.y = 0;
    baria.tag = "b";
    BariaGroup.addChild(baria);

    var baria2 = new Sprite(10,  480);
    baria.backGroundColor = "black";
    baria2.x = 320 - 10;
    baria2.y = 0;
    baria2.tag = "b";
    BariaGroup.addChild(baria2);

    var baria3 = new Sprite(320,  10);
    baria3.backGroundColor = "black";
    baria3.x = 0;
    baria3.y = 320 - 10;
    baria3.tag = "b";
    BariaGroup.addChild(baria3);

    var baria4 = new Sprite(10,  480);
    baria4.backGroundColor = "black";
    baria4.x = 0;
    baria4.y = 0;
    baria4.tag = "b";
    BariaGroup.addChild(baria4);


    var ballGroup = new Group();
    scene.addChild(ballGroup);

    scene.tl.delay(8);
    scene.tl.then(function(){
        //弾
            var ball = new ExSprite(9, 9);
            ball.image = core.assets["images/ball.png"];
            //ball.x = 32/2-4.5+10;
            ball.x = 320-32-10-4.5;
            ball.y = 320/2-4.5;
            ball.vX = -10;
            ball.vY = 0;
            ball.angle = 0;
            ballGroup.addChild(ball);

        ball.addEventListener(Event.ENTER_FRAME, function(){
                ball.x += ball.vX;
                ball.y += ball.vY;
            });

            ball.addCollision(BariaGroup);
            ball.addCollision(RefGroup);
            ball.addCollision(targetGroup);
            ball.addCollision(hcNTGroup);
            ball.addEventListener(Event.COLLISION, function(e){
               //console.log("hit:" + e.collision.target.tag);
               if(e.collision.target.tag == "b"){
                ball.remove();
               }

               if(e.collision.target.tag == "r"){
                 console.log("hit");



                  if(this.vX == 0 && this.vY < 0){
                    changeVector(ball, 10, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z); 
                    //console.log();

                  }

                  else if(this.vX == 0 && this.vY > 0){
                    //console.log("hitwwwww");
                    changeVector(ball, 10, 180-(-180 - -90 - e.collision.target.z) + e.collision.target.z); 
                    //ball.vX = 8 * Math.cos(Math.PI / 180 * 180-(-180 - -90 - e.collision.target.z) + e.collision.target.z);

                  }

                  else if(this.vX > 0 && this.vY == 0){
                    changeVector(ball, 10, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z - 90);
                    //console.log("hit!!"); 
                  }
                  else if(this.vX < 0 && this.vY == 0){
                    changeVector(ball, 10, 180-(180 - 90 - e.collision.target.z) + e.collision.target.z + 90); 

                  }
               }
               if(e.collision.target.tag == "t"){
                if(e.collision.target.hp == 0){
                    clearcounter -= 1;
                    console.log(e.collision.target);
                    e.collision.target.remove();

                    if(clearcounter == 0){
                      var clearLabel = new Label();
                      clearLabel.text = "GAME CLIAR";
                      clearLabel.height = 0;
                      clearLabel.x = 80;
                      clearLabel.y = 100;
                      clearLabel.color = "white";
                      clearLabel.textAlign = "left";
                      clearLabel.font = "32px 'PixelMplus10'";
                      scene.addChild(clearLabel);
                      
                      scene.tl.clear();
                      tLabel.tl.clear();

                      var clearLabel2 = new Label();
                      clearLabel2.text = "BACK TO TITLE";
                      clearLabel2.height = 0;
                      clearLabel2.x = 110;
                      clearLabel2.y = 200;
                      clearLabel2.color = "white";
                      clearLabel2.textAlign = "left";
                      clearLabel2.font = "16px 'PixelMplus10'";
                      scene.addChild(clearLabel2);

                      clearLabel2.addEventListener(Event.TOUCH_START, function(){
                         core.popScene();
                      });
                    }
                }
                e.collision.target.hp -= 1;
                ball.remove();
                e.collision.target.tl.scaleTo(0.7, 1);
                e.collision.target.tl.scaleTo(1, 1)
               }

               if(e.collision.target.tag == "nt"){
                if(e.collision.target.hp == 0){
                    e.collision.target.remove();
                    caunto.frame += 1; 
                    if(caunto.frame  == 3){
                      tLabel.tl.clear();
                      scene.tl.clear();
            
                      var outLabel = new Label();
                      outLabel.text = "GAME OVER";
                      outLabel.height = 0;
                      outLabel.x = 90;
                      outLabel.y = 100;
                      outLabel.color = "red";
                      outLabel.textAlign = "left";
                      outLabel.font = "32px 'PixelMplus10'";
                      scene.addChild(outLabel); 
            
                      var outLabel2 = new Label();
                      outLabel2.text = "BACK TO TITLE";
                      outLabel2.height = 0;
                      outLabel2.x = 110;
                      outLabel2.y = 200;
                      outLabel2.color = "red";
                      outLabel2.textAlign = "left";
                      outLabel2.font = "16px 'PixelMplus10'";
                      scene.addChild(outLabel2);

                      outLabel2.addEventListener(Event.TOUCH_START, function(){
                         core.popScene();
                      });
                    }
                }
                e.collision.target.hp -= 1;
                ball.remove();
                e.collision.target.tl.scaleTo(0.7, 1);
                e.collision.target.tl.scaleTo(1, 1)
               }
            });     
    });
    scene.tl.loop();

    

    // 発射台
    var origin = new ExSprite(32, 32);
    origin.image = core.assets["images/l_origin.png"];
    origin.x = 320-42;
    origin.y = 320/2-16;
    origin.rotation = -90;
    scene.addChild(origin);


    function changeVector(spr, spd, deg){

       //console.log(Math.cos(Math.PI / 180 * deg));

        spr.vX = spd * (Math.cos(Math.PI / 180 * deg));
        spr.vX = Math.round(spr.vX*10)/10;
        spr.vY = spd * (Math.sin(Math.PI / 180 * deg));
        spr.vY = Math.round(spr.vY*10)/10;


        console.log("vx:" + spr.vX);
        console.log("vy:" + spr.vY);
        //console.log(deg);
    }



    //カウント
    var caunto = new ExSprite(96, 32);
    caunto.image = core.assets["images/caunto.png"];
    caunto.x = 285 - (96*0.5);
    caunto.y = 50 - (32*0.5);
    caunto.scale(0.5, 0.5);
    scene.addChild(caunto);

    //時間
    var time = 180;
    var tLabel = new Label();
    tLabel.width = 100;
    tLabel.x = 260;
    tLabel.y = 12;
    tLabel.text = time;
    tLabel.color = "lightblue";
    tLabel.font = "32px 'PixelMplus10'";
    tLabel.textAlign = "left";
    scene.addChild(tLabel);
 
    tLabel.tl.delay(16);
    tLabel.tl.then(function(){
        time -= 1;
        tLabel.text = time;
        if(time <= 0){
            tLabel.tl.clear();
            scene.tl.clear();
            
            var outLabel = new Label();
            outLabel.text = "GAME OVER";
            outLabel.height = 0;
            outLabel.x = 90;
            outLabel.y = 100;
            outLabel.color = "red";
            outLabel.textAlign = "left";
            outLabel.font = "32px 'PixelMplus10'";
            scene.addChild(outLabel);

            var outLabel2 = new Label();
            outLabel2.text = "BACK TO TITLE";
            outLabel2.height = 0;
            outLabel2.x = 110;
            outLabel2.y = 200;
            outLabel2.color = "red";
            outLabel2.textAlign = "left";
            outLabel2.font = "16px 'PixelMplus10'";
            scene.addChild(outLabel2);

            outLabel2.addEventListener(Event.TOUCH_START, function(){
               core.popScene();
            });
        } 
    });
    tLabel.tl.loop();
  

      function Ref(x, y, z){
        //90度反射
        var Ref = new ExSprite(32, 32);
        Ref.image = core.assets["images/hc_r2.png"];
        Ref.scale(1, -1);
        Ref.x = x;
        Ref.y = y;
        Ref.rotation = z;
        scene.addChild(Ref);
        
        //反射板
        var Line = new Sprite(32, 0);
        Line.backgroundColor = "red";
        Line.x = Ref.x + 3;
        Line.y = Ref.y + 15;
        Line.z = -45 + z;
        Line.rotation = -45 + z;
        Line.tag = "r";
        RefGroup.addChild(Line);
        
      }

    function Rer(x, y, z){
        //反射　回転式
        var Rer = new ExSprite(32, 32);
        Rer.image = core.assets["images/hc_r.png"];
        Rer.x = x;
        Rer.y = y;
        Rer.rotation = z;
        scene.addChild(Rer);

        //反射板
        var Line2 = new Sprite(32, 5);
        Line2.backgroundColor = "white";
        Line2.x = x;
        Line2.y = y + 32 / 2 - 2.5;
        Line2.z = z;
        Line2.rotation = z;
        Line2.tag = "r";
        RefGroup.addChild(Line2);

        // 回転
        Rer.addEventListener(Event.TOUCH_START, function(){ 
            
            if(Line2.z == 180 && Line2.z == -180){
                Line2.z = 0;
            }else if(Line2.z == 0){
                Line2.z += 15;
                Line2.rotation += 15;
                Rer.rotation += 15;
            }else if(Line2.z >= 0 && Line2.z > 0){
                Line2.z += 15;
                Line2.rotation += 15;
                Rer.rotation += 15;
            }else if(Line2.z <= 0 && Line2.z < 0){
                Line2.z -= 15;
                Line2.rotation -= 15;
                Rer.rotation -= 15;
            }
        });
    }
    
       
       var clearcounter = 0;

    function hcT(x, y){
       //ハック対象
       var hcT = new ExSprite(32, 32);
       hcT.image = core.assets["images/hc_T.png"];
       hcT.x = x;
       hcT.y = y;
       hcT.hp = 7;
       hcT.tag = "t";
       targetGroup.addChild(hcT);
       clearcounter += 1;
    }
       

    function hcNT(x, y){
    //ハック非対象
    var hcNT = new ExSprite(32, 32);
    hcNT.image = core.assets["images/hc_nt.png"];
    hcNT.x = x;
    hcNT.y = y;
    hcNT.hp = 3;
    hcNT.tag = "nt";
    hcNTGroup.addChild(hcNT);
    }

    function hcst(x, y){
    //ブロック
    var hcst = new ExSprite(320-32, 32);
    hcst.image = core.assets["images/hc_st.png"];
    hcst.x = x;
    hcst.y = y;
    hcst.tag = "b";
    BariaGroup.addChild(hcst);
    }

    function hcst2(x, y){
    //ブロック
    var hcst2 = new ExSprite(32, 32);
    hcst2.image = core.assets["images/hc_st.png"];
    hcst2.x = x;
    hcst2.y = y;
    hcst2.tag = "b";
    BariaGroup.addChild(hcst2);
    }
   
    Rer(10, 320/2-16, 0);
    Rer(100+32, 10, 0);
    Rer(100+32, 320-10-32, 0);
    Rer(100+32, 320/2+48, 45);
    Rer(320-10-32, 320/2+48, 45);
    Rer(320-10-32, 320/2-80-32, 0);
    Rer(100+64, 320/2-80, -45);
    Ref(10, 10, 0);
    Ref(15, 320-10-32, -90);
    Ref(100+32, 320/2-80, -90);
    Ref(320-10-32, 320/2-80, 180);
    hcT(100, 10);
    hcT(100, 320-10-32);
    hcT(320-10-80, 320/2+48);
    hcT(320-10-64, 320-10-52);
    hcT(10+32, 320/2-80-32);
    hcT(320-10-80, 10);
    hcNT(100+64, 10);
    hcNT(100+64, 320-10-32);
    hcNT(320-10-32, 320-10-32);
    hcNT(64, 320/2+48);
    hcst(10+32, 320/2+16);
    hcst(10+32, 320/2-48);
    hcst2(320-10-96, 320-10-64);
    hcst2(10+32, 230/2-32);
    hcst2(320-10-96, 320-10-32);
    hcst2(320-10-113, 10);



}






 
function getRandom(start, end) {
    return start + Math.floor( Math.random() * (end - start + 1));
}
 
function titleStart(){// タイトル画面
    var scene = new Scene();
    core.pushScene(scene); //core.pause();
    //scene.on(enchant.Event.TOUCH_START, function(){});


    var title = new ExSprite(320, 320)
    title.image = core.assets["images/hc_title.png"];
    scene.addChild(title);
    
    var pc = new ExSprite(171, 117)
    pc.image = core.assets["images/pc.png"];
    pc.x = 72;
    pc.y = 147;
    scene.addChild(pc);
    pc.addEventListener(Event.TOUCH_START, function(){
        console.log("test");
        pc.tl.clear();
        pc.tl.scaleTo(5, 5, 6);

        pc.tl.then(function(){
        var scene = new Scene();
        core.pushScene(scene); //core.pause();

        pc.tl.scaleTo(1, 1, 1);

            scene.backgroundColor = "white";
            var backstage = new Sprite(320, 320);
            backstage.backgroundColor = "black";
            scene.addChild(backstage);
            backstage.tl.fadeTo(0.5, 10);
            backstage.tl.fadeTo(1, 45);
            backstage.tl.loop();



            var stage_s = new Sprite(50, 50);
            stage_s.backgroundColor = "green";
            stage_s.x = 50;
            stage_s.y = 200;
            scene.addChild(stage_s);

            var stageLabel = new Label();
            stageLabel.text = "1";
            stageLabel.width = 20;
            stageLabel.x = 65;
            stageLabel.y = 190;
            stageLabel.color = "white";
            stageLabel.textAlign = "left";
            stageLabel.font = "48px 'PixelMplus10'";
            scene.addChild(stageLabel);

            stageLabel.addEventListener(Event.TOUCH_START, function(){
                gameStart();
            });


            var stage_s2 = new Sprite(50, 50);
            stage_s2.backgroundColor = "green";
            stage_s2.x = 135;
            stage_s2.y = 200;
            scene.addChild(stage_s2);

            var stageLabel2 = new Label();
            stageLabel2.text = "2";
            stageLabel2.width = 20;
            stageLabel2.x = 150;
            stageLabel2.y = 190;
            stageLabel2.color = "white";
            stageLabel2.textAlign = "left";
            stageLabel2.font = "48px 'PixelMplus10'";
            scene.addChild(stageLabel2);

            stageLabel2.addEventListener(Event.TOUCH_START, function(){
                gameStart2();
            });

            var stage_s3 = new Sprite(50, 50);
            stage_s3.backgroundColor = "green";
            stage_s3.x = 220;
            stage_s3.y = 200;
            scene.addChild(stage_s3);

            var stageLabel3 = new Label();
            stageLabel3.text = "3";
            stageLabel3.width = 20;
            stageLabel3.x = 235;
            stageLabel3.y = 190;
            stageLabel3.color = "white";
            stageLabel3.textAlign = "left";
            stageLabel3.font = "48px 'PixelMplus10'";
            scene.addChild(stageLabel3);

            stageLabel3.addEventListener(Event.TOUCH_START, function(){
                gameStart3();
            });


            var stageLabel4 = new Label();
            stageLabel4.text = "STAGE SELECT";
            stageLabel4.height = 0;
            stageLabel4.x = 70;
            stageLabel4.y = 40;
            stageLabel4.color = "red";
            stageLabel4.textAlign = "left";
            stageLabel4.font = "32px 'PixelMplus10'";
            scene.addChild(stageLabel4);

            var back3 = new ExSprite(64, 32);
            back3.image = core.assets["images/back.png"];
            scene.addChild(back3);
            back3.addEventListener(Event.TOUCH_START, function(){
                //removeScene(this);
                core.popScene();
            });
        });

 

        
    });

    var playLabel = new Label();
    playLabel.text = "Touch PC";
    playLabel.width = 320;
    playLabel.x = 60;
    playLabel.y = 40;
    playLabel.color = "red";
    playLabel.textAlign = "left";
    playLabel.font = "48px 'PixelMplus10'";
    scene.addChild(playLabel);

    var play = new ExSprite(100, 50);
    play.image = core.assets["images/hc_play.png"];
    play.x = 320 / 2 - 50;
    play.y = 250;
    scene.addChild(play);


    play.addEventListener(Event.TOUCH_START, function(){
        howtoStart();
    });

}


function howtoStart(){
   console.log("test");
   var scene = new Scene();
   core.pushScene(scene); //core.pause();

   scene.backgroundColor = "white";
   var backcolor = new Sprite(320, 320);
   backcolor.backgroundColor = "black";
   scene.addChild(backcolor);
   backcolor.tl.fadeTo(0.2, 10);
   backcolor.tl.fadeTo(1, 45);
   backcolor.tl.loop();



   var mode = new ExSprite(100, 50);
   mode.image = core.assets["images/mode.png"];
   mode.x = 320 / 2 - 50;
   mode.y = 480 / 3 - 100;
   scene.addChild(mode);

   var modeLabel = new Label();
   modeLabel.text = "1";
   modeLabel.width = 20;
   modeLabel.x = 320 / 2 - 10;
   modeLabel.y = 480 / 3 - 115;
   modeLabel.color = "black";
   modeLabel.textAlign = "left";
   modeLabel.font = "48px 'PixelMplus10'";
   scene.addChild(modeLabel);

   modeLabel.addEventListener(Event.TOUCH_START, function(){
            var scene = new Scene();
            core.pushScene(scene); //core.pause();
            //scene.backgroundColor = "green";
            var howback = new Sprite(320, 320);
            howback.backgroundColor = "green";
            scene.addChild(howback);


            var howr = new ExSprite(32, 32);
            howr.image = core.assets["images/hc_r2.png"];
            howr.x = 50;
            howr.y = 100 + 32;
            howr.rotation = 90;
            scene.addChild(howr);

            var howLabel = new Label();
            howLabel.text = "このオブジェクトは、<br/>90度弾がまがります。";
            //howLabel.width = 320;
            howLabel.height = 0;
            howLabel.x = 0;
            howLabel.y = 32;
            howLabel.color = "white";
            howLabel.textAlign = "left";
            howLabel.font = "32px 'PixelMplus5'";
            scene.addChild(howLabel);

            var yazirusi = new ExSprite(64, 64);
            yazirusi.image = core.assets["images/yazirusi.png"];
            yazirusi.x = 60;
            yazirusi.y = 110 + 32;
            scene.addChild(yazirusi);

            var ball2 = new ExSprite(9, 9);
            ball2.image = core.assets["images/ball.png"];
            ball2.x = 57;
            ball2.y = 150 + 32;
            scene.addChild(ball2);

            var ball3 = new ExSprite(9, 9);
            ball3.image = core.assets["images/ball.png"];
            ball3.x = 100;
            ball3.y = 105 + 32;
            scene.addChild(ball3);

            var howLabel2 = new Label();
            howLabel2.text = "このオブジェクトは、<br/>弾を反射させる方向を<br/>調整できます。";
            //howLabel.width = 320;
            howLabel2.height = 0;
            howLabel2.x = 0;
            howLabel2.y = 200 + 32;
            howLabel2.color = "white";
            howLabel2.textAlign = "left";
            howLabel2.font = "32px 'PixelMplus5'";
            scene.addChild(howLabel2);

            var howLabel3 = new Label();
            howLabel3.text = "タップで調整します。";
            //howLabel.width = 320;
            howLabel3.height = 0;
            howLabel3.x = 150;
            howLabel3.y = 210;
            howLabel3.color = "white";
            howLabel3.textAlign = "left";
            howLabel3.font = "16px 'PixelMplus5'";
            scene.addChild(howLabel3);

            var howr2 = new ExSprite(32, 32);
            howr2.image = core.assets["images/hc_r.png"];
            howr2.x = 170;
            howr2.y = 320 + 32 - 200;
            scene.addChild(howr2);

            var yazirusi2 = new ExSprite(64, 64);
            yazirusi2.image = core.assets["images/yazirusi2.png"];
            yazirusi2.x = 110 - 16 + 60;
            yazirusi2.y = 320 - 16 + 32 - 200;
            scene.addChild(yazirusi2);

            var back = new ExSprite(64, 32);
            back.image = core.assets["images/back.png"];
            scene.addChild(back);
            back.addEventListener(Event.TOUCH_START, function(){
                console.log("Hello");
                //removeScene(this);
                core.popScene();
            });
   });



   var mode2 = new ExSprite(100, 50);
   mode2.image = core.assets["images/mode.png"];
   mode2.x = 320 / 2 - 50;
   mode2.y = 480 / 3 * 2 - 100;
   scene.addChild(mode2);

   var modeLabel2 = new Label();
   modeLabel2.text = "2";
   modeLabel2.width = 20;
   modeLabel2.x = 320 / 2 - 10;
   modeLabel2.y = 480 / 3 * 2 - 115;
   modeLabel2.color = "black";
   modeLabel2.textAlign = "left";
   modeLabel2.font = "48px 'PixelMplus10'";
   scene.addChild(modeLabel2);

   modeLabel2.addEventListener(Event.TOUCH_START, function(){
            var scene = new Scene();
            core.pushScene(scene); //core.pause();

            var howback2 = new Sprite(320, 320);
            howback2.backgroundColor = "green";
            scene.addChild(howback2);

            var howt = new ExSprite(32, 32);
            howt.image = core.assets["images/hc_T.png"];
            howt.x = 50;
            howt.y = 100 + 32;
            scene.addChild(howt);

            var howLabel3 = new Label();
            howLabel3.text = "青のオブジェクトを、<br/>全て破壊するとゲーム<br/>クリアです。";
            //howLabel.width = 320;
            howLabel3.height = 0;
            howLabel3.x = 0;
            howLabel3.y = 32;
            howLabel3.color = "white";
            howLabel3.textAlign = "left";
            howLabel3.font = "32px 'PixelMplus5'";
            scene.addChild(howLabel3);

            var ball2 = new ExSprite(9, 9);
            ball2.image = core.assets["images/ball.png"];
            ball2.x = 50 + 32 - 20;
            ball2.y = 150 + 32;
            scene.addChild(ball2);

            var howLabel2 = new Label();
            howLabel2.text = "赤のオブジェクトを、<br/>3つ破壊するとゲーム<br/>オーバーです。";
            //howLabel.width = 320;
            howLabel2.height = 0;
            howLabel2.x = 0;
            howLabel2.y = 200 + 32;
            howLabel2.color = "white";
            howLabel2.textAlign = "left";
            howLabel2.font = "32px 'PixelMplus5'";
            scene.addChild(howLabel2);

            var howt2 = new ExSprite(32, 32);
            howt2.image = core.assets["images/hc_nt.png"];
            howt2.x = 200;
            howt2.y = 100 + 32;
            scene.addChild(howt2);

            var ball3 = new ExSprite(9, 9);
            ball3.image = core.assets["images/ball.png"];
            ball3.x = 200 + 32 - 20;
            ball3.y = 150 + 32;
            scene.addChild(ball3);

            var yazirusi3 = new ExSprite(32, 64);
            yazirusi3.image = core.assets["images/yazirusi3.png"];
            yazirusi3.x = 50 + 32;
            yazirusi3.y = 150;
            scene.addChild(yazirusi3);

            var yazirusi3 = new ExSprite(32, 64);
            yazirusi3.image = core.assets["images/yazirusi3.png"];
            yazirusi3.x = 200 + 32;
            yazirusi3.y = 150;
            scene.addChild(yazirusi3);

            var back2 = new ExSprite(64, 32);
            back2.image = core.assets["images/back.png"];
            scene.addChild(back2);
            back2.addEventListener(Event.TOUCH_START, function(){
                console.log("Hello");
                //removeScene(this);
                core.popScene();
            });
   });
/*
   var mode3 = new ExSprite(100, 50);
   mode3.image = core.assets["images/mode.png"];
   mode3.x = 320 / 2 - 50;
   mode3.y = 480 / 3  * 3 - 100;
   scene.addChild(mode3);

   var modeLabel3 = new Label();
   modeLabel3.text = "3";
   modeLabel3.width = 20;
   modeLabel3.x = 320 / 2 - 10;
   modeLabel3.y = 480 / 3 * 3 - 115;
   modeLabel3.color = "black";
   modeLabel3.textAlign = "left";
   modeLabel3.font = "48px 'PixelMplus10'";
   scene.addChild(modeLabel3);
*/
   var back = new ExSprite(64, 32);
   back.image = core.assets["images/back.png"];
   scene.addChild(back);
   back.addEventListener(Event.TOUCH_START, function(){
                console.log("Hello");
                //removeScene(this);
                core.popScene();
   });

   

}
 


//==========
// EnchantJS
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){
    gameManager = new common.GameManager();
    core = gameManager.createCore(320, 480);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
}
 
//==========
// Manifest
'[cf]{"appTitle":"","appIcon":"../images/icon.png"}[/cf]'