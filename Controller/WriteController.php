<?php

namespace Bytedoc\Bundle\Gps\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;

use Bytedoc\Bundle\Gps\Entity\Webressource;
use Bytedoc\Bundle\Gps\Entity\User;

use Bytedoc\Bundle\Gps\Helper\JsonHelper as JsonHelper;

class WriteController extends Controller
{
	
	// only allow these entities to be managed by the read controller
	// this is the general controller, specific entities must have their own controller
	private $managedEntities = array('Webressource');
	
	private $entityFullPath = 'Bytedoc\\Bundle\\Gps\\Entity\\';
	private $repositoryPath = "BytedocGpsBundle:";
	
	
    public function writeAction($entity)
    {
		if(!in_array($entity, $this->managedEntities)) {
			$response = $this->forward($this->repositoryPath.$entity.':write');
			return $response;
		}
		
		$encoders = array(new XmlEncoder(), new JsonEncoder());
		$normalizers = array(new GetSetMethodNormalizer());

		$serializer = new Serializer($normalizers, $encoders);

		
		
		$request = Request::createFromGlobals();
		$mode = $request->request->get("mode");
		switch ($mode) {
			case 'entity': // update and create
				$array = json_decode($request->request->get("json"));
				$em = $this->getDoctrine()->getManager();
				$repository = $em->getRepository($this->repositoryPath.$entity);
				foreach($array as $arrayItem) {
					unset($db_object);
					if(property_exists($arrayItem,"id")) {
						$db_object = $repository->find($arrayItem->id);
					}
					$new_object = $serializer->denormalize($arrayItem,$this->entityFullPath.$entity,'json');
					if(!isset($db_object)) {
						$entityClassname = $this->entityFullPath.$entity;
						$db_object = new $entityClassname();
						if(method_exists($db_object, "setUser")) {
							$db_object->setUser($this->getUser());
						}
						// TODO set default values for new objects
						$em->persist($db_object);
					}
					// save only if current object "belongs" to the current user
					if(method_exists($db_object, "getUser")) {
						if($db_object->getUser()->getId() == $this->getUser()->getId()) {
							$db_object->copyAllAttributes($new_object);
						} else {
							// not allowed to save
						}
					} else {
						// no user-relationship established, save allowed
						$db_object->copyAllAttributes($new_object);
					}
					
				}
				$em->flush();
				
				// TODO create OK code response
				break;
				
			case 'delete':
				$arrayItem = json_decode($request->request->get("json"));
				$em = $this->getDoctrine()->getManager();
				$repository = $em->getRepository($this->repositoryPath.$entity);
				if(property_exists($arrayItem,"id")) {
					$db_object = $repository->find($arrayItem->id);
				}
				if(isset($db_object)) {
					
					// delete only if current object "belongs" to the current user
					if(method_exists($db_object, "getUser")) {
						if($db_object->getUser()->getId() == $this->getUser()->getId()) {
							$em->remove($db_object);
						} else {
							// not allowed to delete
							return JsonHelper::getJsonResponseError($this, "");
						}
					} else {
						// no user-relationship established, delete allowed
						$em->remove($db_object);
					}
				}
				$em->flush();
			
				// TODO create OK code response
				break;

			default:
				// TODO code error response
				break;
		}
		
		return JsonHelper::getJsonResponseOK($this, "");
    }
	
}
