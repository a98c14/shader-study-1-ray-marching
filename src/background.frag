struct ObjectData {
  vec3  color;
  vec3  position;
  float radius;
};

struct Intersection {
  vec3 color;
};

#define SCENE_OBJECT_COUNT 5

uniform float      uStepSize;
uniform float      uStepCount;
uniform vec3       uBackgroundColor;
uniform ObjectData uScene[SCENE_OBJECT_COUNT];
uniform vec3       uLightPos;

varying vec2       vUv;


float checkIntersection(vec3 point, out vec3 color) {
  for(int i = 0; i < SCENE_OBJECT_COUNT; i++) {
    vec3 target = uScene[i].position;
    float radius = uScene[i].radius;
    float intersection = 1. - step(radius, distance(point, target));
    if(intersection > .5) {
      color = uScene[i].color;
      return intersection;
    }
  }
}

float castRayToLight(vec3 origin) {
  vec3 direction = normalize(uLightPos - origin);
  origin += direction * .01;
  for(float i = 0.0; i < uStepCount; i++) {
    origin += direction * uStepSize;
    vec3 c;
    float intersection = checkIntersection(origin, c);
    if(intersection > .5)
      return .1;
    if(distance(uLightPos, origin) < .4) {
      return 1.;
    }
  }
}

float castRay(vec3 origin, vec3 direction, out vec3 color) {
  for(float i = 0.0; i < uStepCount; i++) {
    origin += direction * uStepSize;
    float intersection = checkIntersection(origin, color);
    if(intersection > .5) {
      vec3 lightDirection = normalize(uLightPos - origin);
      vec3 lightColor;
      float light = castRayToLight(origin);
      return intersection * light;
    }
  }
}

void main() {
  vec3 spherePos = vec3(0., 0., 3.0);
  vec3 lightPos = vec3(1.0, 1.0, 3.0);
  float sphereRadius = 1.0;

  vec3 uv = vec3((vUv - 0.5) * 2.0, 1.0);
  vec3 dir = normalize(uv);
  vec3 pos = vec3(0., 0., 1.0);
  vec3 color;
  float hasIntersected = castRay(pos, dir, color);
  gl_FragColor = vec4(vec3(hasIntersected) * color, 1.0);
}