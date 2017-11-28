<?php
    //当用户请求服务端返回一个表单时，创建一个0-100的数字
    //$_SERVER['REQUEST_METHOD'] 判断当前提交的方式是什么
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        //创建一个随机数 并且把放在一个文件中存放
        $random = random_int(0,100);
        file_put_contents('news.txt', $random);
    }else{
        //不是请求那就是用户点击写了内容 提交了服务端
        //开始判断用户输入的内容是否合法 判断是否是数字，是否输入值
        $num=isset($_POST['num']) && is_numeric($_POST['num'])
        ? (int)$_POST['num']
        : -1;
        //接下来判断$num的值
        if($num == -1){
            echo '输入的数字不合法';
        }else{

            //当入这个分支结构 声明用户输入的数值正确 把这个数字存放到一个文件中
            file_put_contents('news1.txt',$num . "\n",FILE_APPEND);
            $num1 = file_get_contents('news1.txt');
            //将这些字符串转变为数组
            $arr=explode("\n",$num1);
            //我们发现 由于我们以\n分隔 到最后会多添加一个空数组s
            //判断数组的长度
            if(count($arr) == 11){
                echo '10次机会已经用完!!，已经重新随机了数字!!';
                //当10次机会用完后 要做的事情就清空文件中数字以及重新随机数
                 $random = random_int(0,100);
                file_put_contents('news.txt', $random);
                //清空文件 随便清除了数字
                unlink('news1.txt');
            }

            $v='';
            //遍历数组
            foreach ($arr as  $value) {
                //取出这些数字 放入一个变量里
                $v .= $value.' ';
            }
            //接收到数字  然后我们获取上一次存在文件的随机数
            $old_random=file_get_contents('news.txt');
            //如果进入该分支结构 说明用户输入的数字合法
            //然后再判断用户输入的数值和我们系统随机选出的数值的大小
            $num1=$num-$old_random;  //让用户的值与随机数相减  判断$num1与0的关系
            if($num1>0){
                echo '数字大了';
            }elseif($num1<0){
                echo '数字小了';
            }else{
                echo '输入正确';
                //当我们输入正确  重新随机一个数
                $random = random_int(0,100);
                file_put_contents('news.txt', $random);
                //输出正确 我们也删除存放多次的数字
                unlink('news1.txt');
            }
        }
    }
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>猜数字</title>
  <style>
    body {
      padding: 100px 0;
      background-color: #2b3b49;
      color: #fff;
      text-align: center;
      font-size: 2.5em;
    }
    input {
      padding: 5px 20px;
      height: 50px;
      background-color: #3b4b59;
      border: 1px solid #c0c0c0;
      box-sizing: border-box;
      color: #fff;
      font-size: 20px;
    }
    button {
      padding: 5px 20px;
      height: 50px;
      font-size: 16px;
    }
  </style>
</head>
<body>

  <h1>猜数字游戏</h1>
  <p>Hi，我已经准备了一个 0 - 100 的数字，你需要在仅有的 10 机会之内猜对它。</p>

    <span>记录</span>
    <span><?php echo isset($v) ? $v : '' ?></span>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <input type="number" min="0" max="100" name="num" placeholder="随便猜">
    <button type="submit">试一试</button>
  </form>
</body>
</html>
