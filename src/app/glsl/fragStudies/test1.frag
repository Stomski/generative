#ifdef GL_ES
precision mediump float;
#endif
// below are my declared variables

uniform float u_time;
uniform vec2 u_resolution;

vec3 pallette( float t){
	vec3 a = vec3(0.40);
	vec3 b = vec3(0.5);
	vec3 c = vec3(1.0);
	vec3 d = vec3(0.279, 0.4,0.5); 

	return a + b * cos(6.28318*(c*t+d) );
}


void main() {

//this sets the center to 0,0 and scales resolution

vec2 uv = (gl_FragCoord.xy*2.0-u_resolution.xy)/u_resolution.y;

vec3 finalcolor  =  vec3(0.0);

vec2 uv0 = uv;



for (float i =0.0; i <3.0;i++){

	uv = fract(uv*2.13)-0.5;


	float d = length(uv);


	d =  sin(d*8.0 + u_time)/8.0;

	d= abs(d);
	d= 0.01/d;

	vec3 color = pallette(length(uv0)+u_time*i/10.0);

	finalcolor += color*d;

}

gl_FragColor = vec4(finalcolor,1.0);

}
