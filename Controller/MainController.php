<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use ByteDoc\GpsBundle\Entity\Webressource;

class MainController extends Controller
{
    public function indexAction($name)
    {
		$webressource = new Webressource();
		$webressource->setGuid("zyxwvu");
		$webressource->setCategory("speziell");
		$webressource->setTitle("zweiter Eintrag");
		$webressource->setHref("http://blog.bytedoc.net");
		$webressource->setRating(3);
		
		$em = $this->getDoctrine()->getManager();
		//$em->persist($webressource);
		$em->flush();
		
        return $this->render('BytedocGpsBundle:Main:' . $name . '.html.twig');
    }
}
