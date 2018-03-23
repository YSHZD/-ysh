<?php
/**
 * Created by PhpStorm.
 * User: sunpeng
 * Date: 2017/11/6
 * Time: 上午9:36
 */

$arr = file_get_contents('php://input');

exit(json_encode($arr,$_POST['data']));