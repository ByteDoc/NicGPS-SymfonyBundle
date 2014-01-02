<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;


class ReadController extends Controller
{
    public function readAction($entity)
    {
		$repository = $this->getDoctrine()->getRepository("BytedocGpsBundle:".$entity);
		$objects = $repository->findAll();
		// TODO do NOT read passwords or other sensitive data from Users!!!
		
		$jsonString = $this->serializeToJson($objects);
		
		return $this->getJsonResponse($jsonString);
    }
	
	private function serializeToJson($object)
	{
		$encoders = array(new XmlEncoder(), new JsonEncoder());
		$normalizers = array(new GetSetMethodNormalizer());

		$serializer = new Serializer($normalizers, $encoders);
		
		return $serializer->serialize($object, 'json');
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
