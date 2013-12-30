<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('BytedocGpsBundle:Main:' . $name . '.html.twig');
    }
}
