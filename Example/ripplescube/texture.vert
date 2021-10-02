varying vec2 ST;

void
main( void )
{
	// gl_TexCoord[0] = gl_MultiTexCoord0;
	ST = vec2( gl_MultiTexCoord0 );
	// gl_TexCoord[1] = gl_MultiTexCoord1;
	gl_Position = ftransform();
}
