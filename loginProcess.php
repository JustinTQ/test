<?php
  require_once 'adminService.php';
  require_once 'code.class.php';
  //
  session_start();
  if($_SESSION['code']!=$_POST['code']){
      header("Location: homePage.html?errno=3");
      exit();
  }
  //接受用户数据
  // 用户名
  $id=$_POST['id'];
  // 密码
  $password=$_POST['password'];
  //记住密码
  if(!empty($_POST['remenber'])){
    setcookie("id",$id,time()+24*3600);
  }else if(!empty($_COOKIE['id'])){
    setcookie("id",$id,time()-1);
  }
  //实例化一个adminService方法
  $adminService=new adminService();
  $ret=$adminService->checkAdmin($id,$password);
  if($adminService->checkAdmin($id,$password)==1){
    //echo "密码错误，请重新登录";
    header("Location: homePage.html?errno=1&id=$id");
    exit();
  }else if($adminService->checkAdmin($id,$password)==2){
      //echo "用户名不存在，请重新登录";
      header("Location: homePage.html?errno=2");
      exit();
      }else{
        //记住账号
        if(!empty($_POST['remenber'])){
          setcookie("id",$id,time()+24*3600);
          setcookie("password",$password,time()+24*3600);
          }else if(!empty($_COOKIE['id'])){
            setcookie("id",$id,time()-1);
            setcookie("password",$password,time()-1);
          }
        header("Location: homePage.html?name=$ret");
        exit();
      }
?>