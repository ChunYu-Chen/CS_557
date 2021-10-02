varying vec2  ST;
varying float LightIntensity;

uniform float MaxIterations;
uniform float Zoom;
uniform float Xcenter;
uniform float Ycenter;
uniform vec4  InnerColor;
uniform vec4  OuterColor1;
uniform vec4  OuterColor2;
uniform float Creal, Cimag;

void main()
{
	float   real  = ST.s * Zoom + Xcenter;
	float   imag  = ST.t * Zoom + Ycenter;

	float r2 = 0.0;
	float iter;

	for( iter = 0.0; iter < MaxIterations && r2 < 4.0; iter++ )
	{
		float newreal = real*real - imag*imag  +  Creal;
		float newimag = 2.*real*imag  +  Cimag;
		r2 = newreal*newreal + newimag*newimag;
		real = newreal;
		imag = newimag;
	}

	// base the color on the number of iterations

	vec4 color;

	if( r2 < 4. )
		color = InnerColor;
	else
		color = mix( OuterColor1, OuterColor2, fract(iter * 0.2) );

	color.rgb *= LightIntensity;

	gl_FragColor = color;
}
