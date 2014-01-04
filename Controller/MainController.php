<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
    public function indexAction()
    {
		
		switch (strtolower($this->getUser()->getUsername())) {
			case 'max':
				return $this->render('BytedocGpsBundle:Main:max.html.twig');
				break;
			
				// use nix.html.twig for all default users ("demo"!)
			default:
				return $this->render('BytedocGpsBundle:Main:nic.html.twig');
				break;
		}
        // check current user name
		
    }
}
