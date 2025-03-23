// Importa o módulo do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do teste de stress
export const options = {
  stages: [
    { duration: '2m', target: 50 }, // Aumenta para 50 VUs em 2 minutos
    { duration: '3m', target: 100 }, // Sobe para 100 VUs e mantém por 3 minutos
    { duration: '2m', target: 0 }, // Desce rapidamente
  ],
};

// Função principal
export default function () {
  const BASE_URL = 'https://sua-api.com';
  const res = http.get(`${BASE_URL}/endpoint`);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

// Exemplo de execução:
// k6 run k6_stress_test.js
