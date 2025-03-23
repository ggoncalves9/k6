// Importa o módulo do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do teste de carga
export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Sobe até 100 VUs em 2 minutos
    { duration: '5m', target: 100 }, // Mantém 100 VUs por 5 minutos
    { duration: '2m', target: 0 }, // Desce gradualmente
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
// k6 run k6_carga_test.js
