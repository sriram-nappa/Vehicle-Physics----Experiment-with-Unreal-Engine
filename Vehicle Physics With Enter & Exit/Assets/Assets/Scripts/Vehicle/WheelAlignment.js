#pragma strict
@script AddComponentMenu("Vehicle/WheelAlignment")

public var CorrespondingCollider : WheelCollider;
public var SlipPrefab : GameObject;
private var RotationValue : float = 0.0;

function Update () {

	var hit : RaycastHit;
	var ColliderCenterPoint : Vector3 = CorrespondingCollider.transform.TransformPoint( CorrespondingCollider.center );

	if(Physics.Raycast( ColliderCenterPoint, -CorrespondingCollider.transform.up, hit, CorrespondingCollider.suspensionDistance + CorrespondingCollider.radius)) {
		transform.position = hit.point + (CorrespondingCollider.transform.up * CorrespondingCollider.radius);
	}else{
		transform.position = ColliderCenterPoint - (CorrespondingCollider.transform.up * CorrespondingCollider.suspensionDistance);
	}

	transform.rotation = CorrespondingCollider.transform.rotation * Quaternion.Euler( RotationValue, CorrespondingCollider.steerAngle, 0 );
	RotationValue += CorrespondingCollider.rpm * ( 360/60 ) * Time.deltaTime;

	var CorrespondingGroundHit : WheelHit;
	CorrespondingCollider.GetGroundHit( CorrespondingGroundHit );

	if ( Mathf.Abs( CorrespondingGroundHit.sidewaysSlip ) > 10 ) {
		if ( SlipPrefab ) {
			Instantiate( SlipPrefab, CorrespondingGroundHit.point, Quaternion.identity );
		}
	}
}