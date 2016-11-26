<?php
    //这是一个工具类，用来完成对数据库的操作
    class sqlHelper{
    	private $mysqli;
    	//连接数据库的主机名，用户名，密码，数据库名
    	private $host="localhost";
    	private $user="root";
    	private $pwd="930924";
    	private $db="employ";
    	public function __construct(){
    		$this->mysqli=new mysqli($this->host,$this->user,$this->pwd,$this->db);
    		if($this->mysqli->connect_error){
    			die("连接失败".$this->mysqli->connect_error);
    		}
    		$this->mysqli->query("set names utf8");
    	}
    	//执行dql语句
    	public function execute_dql($sql){
    		$res=$this->mysqli->query($sql);
    		return $res;
    	}
    	//执行dql语句，但返回的是一个数组
    	public function execute_dql2($sql){
    		$arr=array();
    		$res=$this->mysqli->query($sql) or die("操作失败".$this->mysqli->error);
    		//把结果集内容转移到一个数组中
    		while($row=mysqli_fetch_assoc($res)){
    			$arr[]=$row;
    		}
    		//释放资源
    		$res->free();
    		return $arr;
    	}
    	//执行dml语句
    	public function execute_dml($sql){
    		$b=$this->mysqli->query($sql);
    		if(!$b){
				return 0;
			}else{
			    if($this->mysqli->affected_rows>0){
				    return 1;
			    }else{
				    return 2;
			    }
    	    }
        }
        //释放资源，关闭连接
    	public function close_connect(){
    		if(!empty($this->mysqli)){
    			$this->mysqli->close();
    		}
    	}
    }

?>