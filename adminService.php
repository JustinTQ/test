<?php
    require_once 'sqlHelper.class.php';
    //业务逻辑处理类，主要完成对admin表的操作
    class adminService{
    	//验证用户是否合法
    	public function checkAdmin($id,$password){
    		$sql="select password,name from admin where id=$id";
    		//创建一个sqlHelper对象
    		$sqlHelper=new sqlHelper();
    		$res=$sqlHelper->execute_dql($sql);
    		if($row=mysqli_fetch_assoc($res)){
                if($row['password']==md5($password)){
  	 	            //说明合法
  	 	            return $row['name'];
  	            }else{
  	 	            //echo "密码错误，请重新登录";
  	 	            return 1;
  	            }

            }else{
  	            //echo "用户名不存在，请重新登录";
  	            return 2;
            }
        //释放资源
        $res->free();
        //关闭连接
        $sqlHelper->close_connect();
    	}
      public function resetPwd($id,$password){
          $sql="update admin set password=md5('$password') where id=$id";
          $sqlHelper=new sqlHelper();
          $res=$sqlHelper->execute_dml($sql);
          $sqlHelper->close_connect();
          return $res;
      }
    }
?>