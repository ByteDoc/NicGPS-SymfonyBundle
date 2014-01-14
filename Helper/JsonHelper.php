<?php

namespace Bytedoc\Bundle\Gps\Helper;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;

use JMS\Serializer\SerializerBuilder;

//use Bytedoc\Bundle\Gps\Entity\User;

class JsonHelper {

	public static function serializeToJson($object)
	{
		//$encoders = array(new XmlEncoder(), new JsonEncoder());
		//$normalizers = array(new GetSetMethodNormalizer());

		//$serializer = new Serializer($normalizers, $encoders);
		
		$serializer = \JMS\Serializer\SerializerBuilder::create()->build();
		
		return $serializer->serialize($object, 'json');
	}
	
	public static function getJsonResponseOK($controller, $jsonString) {
		return self::getJsonResponse($controller, $jsonString, 200);
	}
	
	public static function getJsonResponseError($controller, $jsonString) {
		return self::getJsonResponse($controller, $jsonString, 500);
	}
	
	public static function getJsonResponse($controller, $jsonString, $statusCode=200)
	{
		// Create a response object with JSON content header
		$content = $controller->renderView('BytedocGpsBundle:Main:json.html.twig', array('json_string'  => $jsonString));
		$responseHeaders = array('content-type' => 'application/json');
		return new Response($content, $statusCode, $responseHeaders);
		
		// creating a JSON Reponse
		// wird noch als Unicode ausgegeben, das muss ich mir dann noch anschauen...
		//$response = new JsonResponse();
		//$response->setData($jsonContent);
		//return $response;
	}

}