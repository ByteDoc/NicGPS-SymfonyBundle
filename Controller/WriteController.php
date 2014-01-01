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

use ByteDoc\GpsBundle\Entity\Webressource;

class WriteController extends Controller
{
    public function writeAction($entity)
    {
		$encoders = array(new XmlEncoder(), new JsonEncoder());
		$normalizers = array(new GetSetMethodNormalizer());

		$serializer = new Serializer($normalizers, $encoders);
		
		
		
		$request = Request::createFromGlobals();
		$mode = $request->request->get("mode");
		switch ($mode) {
			case 'entity':
				$array = json_decode($request->request->get("json"));
				$em = $this->getDoctrine()->getManager();
				$repository = $em->getRepository("BytedocGpsBundle:".$entity);
				foreach($array as $arrayItem) {
					unset($db_object);
					if(property_exists($arrayItem,"id")) {
						$db_object = $repository->find($arrayItem->id);
					}
					if(!isset($db_object)) {
						$db_object = new Webressource();
						// TODO set default values for new objects
						$em->persist($db_object);
					}
					$new_object = $serializer->denormalize($arrayItem,'Bytedoc\\GpsBundle\\Entity\\'.$entity,'json');
					$db_object->copyAllAttributes($new_object);
				}
				$em->flush();
				
				// TODO create OK code response
				break;
				
			case 'delete':
				$arrayItem = json_decode($request->request->get("json"));
				$em = $this->getDoctrine()->getManager();
				$repository = $em->getRepository("BytedocGpsBundle:".$entity);
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
		
		return $this->getJsonResponse("");
    }
	
	
	private function getJsonResponse($jsonString)
	{
		// Create a response object with JSON content header
		$content = $this->renderView('BytedocGpsBundle:Read:json.html.twig', array('json_string'  => $jsonString));
		$statusCode = 200;
		$responseHeaders = array('content-type' => 'application/json');
		return new Response($content, $statusCode, $responseHeaders);
		
		// creating a JSON Reponse
		// wird noch als Unicode ausgegeben, das muss ich mir dann noch anschauen...
		//$response = new JsonResponse();
		//$response->setData($jsonContent);
		//return $response;
	}
}
