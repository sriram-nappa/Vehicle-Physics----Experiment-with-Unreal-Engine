/**
*  This script must be placed on vehicle model! 
* Simply create box (turn off renderer and make it as trigger), 
* after that you must make this box as a child of vehicle (parent)! 
* Place somewhere on the vehicle model, where you will activate it!
* Script made by OMA [www.armedunity.com]
**/
var vehicleCam : GameObject;			
var vehicleCameraTarget : Transform;
var vehicle : GameObject; 
private var Player;
var GetOutPosition : Transform;  					// Empty game object, where player will get out of the vehicle
var VehicleControllScript : String = "ScriptName"; 	// Just write script name, which controls vehicle movement (controller script).  
private var opened : boolean = false;
private var waitTime : float = 1; 					// leave it as 1 
private var temp : boolean = false;
private var mainCamera : GameObject;



function Start () {
	Player = GameObject.FindWithTag("Player"); 		
	mainCamera = GameObject.FindWithTag("MainCamera");
	vehicleCam.camera.enabled = false;
	vehicle.GetComponent(VehicleControllScript).controlsEnabled = false;
	vehicleCam.GetComponent(AudioListener).enabled = false;  
}

function Update() {
    if ((Input.GetKeyDown("e")) && opened && !temp){
		GetOut();
        opened = false;
	    temp = false;
    }
}

function Action (){
	if (!opened && !temp){
        GetIn();
	    opened = true;
	    temp = true;
	    yield WaitForSeconds(waitTime);
	    temp = false;
    }
}


function GetIn() {
	var changeTarget : VehicleCamera = vehicleCam.transform.GetComponent("VehicleCamera");
	changeTarget.target = vehicleCameraTarget;
	Player.SetActive(false);
	Player.transform.parent = vehicle.transform;
	Player.transform.position = vehicleCameraTarget.transform.position;
	mainCamera.camera.enabled = false;
	vehicleCam.camera.enabled = true;
	vehicle.GetComponent(VehicleControllScript).controlsEnabled = true;
	vehicleCam.GetComponent(AudioListener).enabled = true;
}


function GetOut() {
	Player.transform.parent = null;
	Player.transform.position = GetOutPosition.transform.position;
	Player.SetActive(true);
	mainCamera.camera.enabled = true;
	vehicleCam.camera.enabled = false;
	vehicleCam.GetComponent(AudioListener).enabled = false;
	vehicle.GetComponent(VehicleControllScript).controlsEnabled = false;
}
