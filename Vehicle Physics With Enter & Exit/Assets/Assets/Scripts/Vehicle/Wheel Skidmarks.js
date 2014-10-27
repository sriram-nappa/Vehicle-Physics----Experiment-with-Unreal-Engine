#pragma strict
@script AddComponentMenu("Vehicle/Wheel_Skidmark_Controller")

var skidCaller : GameObject;
var startSlipValue : float = 6.5;
private var skidmarks : Skidmarks = null;
private var lastSkidmark : int = -1;
private var wheel_col : WheelCollider;

function Start ()
	{
	wheel_col = GetComponent(WheelCollider);
	if(FindObjectOfType(Skidmarks))
	{
		skidmarks = FindObjectOfType(Skidmarks);
	}
	else
		Debug.Log("No skidmarks object found. Skidmarks will not be drawn");
	}

function FixedUpdate ()
	{
	var GroundHit : WheelHit;
	wheel_col.GetGroundHit( GroundHit );
	var wheelSlipAmount = Mathf.Abs( GroundHit.sidewaysSlip );

	if ( wheelSlipAmount > startSlipValue ) //if sideways slip is more than desired value
	{

	var skidPoint : Vector3 = GroundHit.point + 2*(skidCaller.rigidbody.velocity) * Time.deltaTime;

	lastSkidmark = skidmarks.AddSkidMark(skidPoint, GroundHit.normal, wheelSlipAmount/25, lastSkidmark);	
	}
	else
	{
	lastSkidmark = -1;
	}
			
	}