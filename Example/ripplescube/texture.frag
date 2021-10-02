varying vec2 ST;
uniform sampler2D TexUnit;

void
main( void )
{
	vec3 rgb = texture2D( TexUnit, ST ).rgb;

	gl_FragColor = vec4( rgb, 1. );
}
