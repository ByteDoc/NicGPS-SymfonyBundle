<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;

use ByteDoc\GpsBundle\Helper\JsonHelper as JsonHelper;

class UserController extends Controller
{

	private $entityFullPath = 'Bytedoc\\GpsBundle\\Entity\\User';
	private $repositoryPath = "BytedocGpsBundle:User";
	
	private function checkAuthorization() {
		if (false === $this->get('security.context')->isGranted('ROLE_GPS_ADMIN')) {
	        throw new AccessDeniedException();
	    }
	}
	
	public function readAction() {
		$this->checkAuthorization();

		$em = $this->getDoctrine()->getManager();
		$query = $em->createQuery(
			'SELECT u.id, u.username, u.email, u.isActive '.
			'FROM Bytedoc\GpsBundle\Entity\User u');
		$objects = $query->getResult();

		$jsonString = JsonHelper::serializeToJson($objects);

		return JsonHelper::getJsonResponseOK($this, $jsonString);
	
	}
	
	
    public function writeAction()
    {
		$this->checkAuthorization();
		
		$encoders = array(new XmlEncoder(), new JsonEncoder());
		$normalizers = array(new GetSetMethodNormalizer());

		$serializer = new Serializer($normalizers, $encoders);

		
		
		$request = Request::createFromGlobals();
		$mode = $request->request->get("mode");
		switch ($mode) {
			case 'entity': // update and create
				$array = json_decode($request->request->get("json"));
				$em = $this->getDoctrine()->getManager();
				$repository = $em->getRepository($this->repositoryPath);
				foreach($array as $arrayItem) {
					unset($db_object);
					if(property_exists($arrayItem,"id")) {
						$db_object = $repository->find($arrayItem->id);
					}
					$new_object = $serializer->denormalize($arrayItem,$this->entityFullPath,'json');
					if(!isset($db_object)) {
						$entityClassname = $this->entityFullPath;
						$db_object = new $entityClassname();
						// TODO set default values for new objects
						$em->persist($db_object);
					}
					$db_object->setUsername($new_object->getUsername());
					$db_object->setEmail($new_object->getEmail());
					if($new_object->getPassword() != "") {
						$factory = $this->get('security.encoder_factory');
						$encoder = $factory->getEncoder($db_object);
						$password = $encoder->encodePassword($new_object->getPassword(), $db_object->getSalt());
						$db_object->setPassword($password);
					}

					
				}
				$em->flush();
				
				// TODO create OK code response
				break;
				
			case 'delete':
				$arrayItem = json_decode($request->request->get("json"));
				$em = $this->getDoctrine()->getManager();
				$repository = $em->getRepository($this->repositoryPath);
				if(property_exists($arrayItem,"id")) {
					$db_object = $repository->find($arrayItem->id);
				}
				if(isset($db_object)) {
					$em->remove($db_object);
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
