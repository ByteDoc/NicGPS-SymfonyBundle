<?php

namespace Bytedoc\GpsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class ReadController extends Controller
{
    public function indexAction($dataset)
    {

		//header('Content-Type: application/json');

		// read the requested dataset
		//$dataset = $_REQUEST['dataset'];

		// check for allowed characters only
		if(preg_match('/^[a-z0-9\-\_]+$/i', $dataset)) {
			// try to read existing json file for requested dataset
			$filename = "data/" . $dataset . ".json";

			// Data in File stored as JSON Format
			if(file_exists($filename)) {
				$jsonString = file_get_contents($filename);
			} else {
				$jsonString = "[]";
			}
		} else {
			$jsonString = "[]";
		}
		$jsonString = stripslashes($jsonString);
		//echo $jsonString; exit();
		

		//$jsonString = getcwd();

        //return $this->render('ByteDocHelloBundle:Read:json.html.twig', array('json_string' => $jsonString));
		
		// alternative rendering by creating a reponse object
		$content = $this->renderView('ByteDocHelloBundle:Read:json.html.twig', array('json_string'  => $jsonString));
		$statusCode = 200;
		$responseHeaders = array('content-type' => 'application/json');
		return new Response($content, $statusCode, $responseHeaders);
		
		
		// creating a JSON Reponse
		// wird noch als Unicode ausgegeben, das muss ich mir dann noch anschauen...
		// ... wenn ich die Daten nicht aus einer Datei sondern aus der Datenbank hole ...
		// ... und demnach als Array bzw. als Objekt verarbeiten kann
		$response = new JsonResponse();
		//$response->setData($jsonString);
		$data = array( 'modelData' => array(
			//array(lastName => 'Dente', name => 'Max', 'checked' => true, 'linkText' => 'www.sap.com', 'href' => 'http://www.sap.com/', 'rating' => 4),
			array('lastName' => 'Friese', 'name' => 'Andy', 'checked' => true, 'linkText' => 'https://experience.sap.com/fiori', 'href' => 'https://experience.sap.com/fiori', 'rating' => 2),
			array('lastName' => 'Mann', 'name' => 'Anita', 'checked' => false, 'linkText' => 'www.sap.com', 'href' => 'http://www.sap.com/', 'rating' => 3)
			)
		);
		$response->setData($data);
		
		//return $response;
		
    }
}
