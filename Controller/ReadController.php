<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Bytedoc\GpsBundle\Helper\JsonHelper as JsonHelper;

class ReadController extends Controller
{
	// only allow these entities to be managed by the read controller
	// this is the general controller, specific entities must have their own controller
	private $managedEntities = array('Webressource');
	
    public function readAction($entity)
    {
		if(!in_array($entity, $this->managedEntities)) {
			$response = $this->forward('BytedocGpsBundle:'.$entity.':read');
			return $response;
		}
		
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository("BytedocGpsBundle:".$entity);
		$objects = $repository->findAll();

		
		$jsonString = JsonHelper::serializeToJson($objects);
		
		return JsonHelper::getJsonResponseOK($this, $jsonString);
    }
	
}
