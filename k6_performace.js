// Importa o módulo do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do teste de desempenho
export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Aumenta para 10 VUs em 10 segundos
    { duration: '3m', target: 20 }, // Mantém 20 VUs por 3 minutos
    { duration: '10s', target: 0 }, // Desce rapidamente
  ],
};

// Função principal
export default function () {
  const BASE_URL = 'https://sua-api.com';
  const res = http.get(`${BASE_URL}/endpoint`);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 300ms': (r) => r.timings.duration < 300,
  });

  sleep(1);
}

// Exemplo de execução:
// k6 run k6_performance_test.js
