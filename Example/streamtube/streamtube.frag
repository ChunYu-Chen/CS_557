varying vec4  Color;
varying float LightIntensity;

void
main( void )
{
	gl_FragColor = vec4( LightIntensity*Color.rgb, 1. );
}
