<?php

namespace Bytedoc\Bundle\Gps\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Bytedoc\Bundle\Gps\Helper\JsonHelper as JsonHelper;

class ReadController extends Controller
{
	// only allow these entities to be managed by the read controller
	// this is the general controller, specific entities must have their own controller
	private $managedEntities = array('Webressource');
	
	private $entityFullPath = 'Bytedoc\\Bundle\\Gps\\Entity\\';
	private $repositoryPath = "BytedocGpsBundle:";
	
    public function readAction($entity)
    {
		if(!in_array($entity, $this->managedEntities)) {
			$response = $this->forward($this->repositoryPath.$entity.':read');
			return $response;
		}
		
		$em = $this->getDoctrine()->getManager();
		
		// read only the objects for the current user
		if(method_exists($this->entityFullPath.$entity, "getUser")) {
			$query = $em->createQuery('SELECT e FROM '.$this->entityFullPath.$entity.' e WHERE e.user = '.$this->getUser()->getId());
			$objects = $query->getResult();
		} else {
			$repository = $this->getDoctrine()->getRepository($this->repositoryPath.$entity);
			$objects = $repository->findAll();
		}

		
		$jsonString = JsonHelper::serializeToJson($objects);
		
		return JsonHelper::getJsonResponseOK($this, $jsonString);
    }
	
}
