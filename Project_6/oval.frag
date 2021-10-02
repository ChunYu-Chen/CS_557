#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uTol;
uniform float uAlpha;
uniform float Center;
uniform float TimePosition;
uniform float Amp;
uniform float Period;
uniform float LightX, LightY, LightZ;
uniform vec4 Color;

uniform sampler3D Noise3;

in vec2 vST;
in vec3 vMCposition;
in vec3 ECposition;
vec4 WHITE = vec4( 1., 1., 1., uAlpha);


void
main( )
{
  vec4 nv = texture3D( Noise3, uNoiseFreq * vMCposition );
  float n = nv.r + nv.g + nv.b + nv.a; // range is 1. -> 3.
  n = n - 2.; // range is now -1. -> 1.
  n *= uNoiseAmp;

  int numins = int( vST.s / uAd );
  int numint = int( vST.t / uBd );

  float Ar = uAd/2.;
  float Br = uBd/2.;

  float sc = float(numins) * uAd  +  Ar;
  float ds = vST.s - sc;                   // wrt ellipse center
  float tc = float(numint) * uBd  +  Br;
  float dt = vST.t - tc;                   // wrt ellipse center

  float oldDist = sqrt( ds*ds + dt*dt );
  float newDist = oldDist + n;
  float scale = newDist / oldDist; // this could be < 1., = 1., or > 1.

  ds *= scale; // scale by noise factor
  ds /= Ar; // ellipse equation
  dt *= scale; // scale by noise factor
  dt /= Br; // ellipse equation
  float rfrac = ds*ds + dt*dt;

/*****************************Compute vanished circles*****************************/
  const float PI = 3.14159265;
  vec3 center = vec3( Center, 0., 0. );

  float radius = length( vMCposition - center );

  float ua = Amp * (PI/Period) * sin( PI*radius/Period - PI*TimePosition); 
	float va = 0.;
	float wa = 1.;

  vec3 normal = normalize( vec3( ua, va, wa ) );

  float vLightIntensity  = 1. * abs( dot( normalize(vec3(LightX,LightY,LightZ) - ECposition), normal ) );
	if( vLightIntensity < 0.1 )
  {
    vLightIntensity = 0.1;
  }

  float t = smoothstep( 1-uTol, 1+uTol, rfrac );

  vec4 Mix = mix( Color,WHITE, t );
  if (Mix == vec4(1.,1.,1.,0.))
    discard ;

  vec4 rgb = vLightIntensity * Mix;

  gl_FragColor = rgb;
  
}
