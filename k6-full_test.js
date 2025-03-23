// Importa o módulo do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do teste com 3 cenários distintos
export const options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 50 }, // Sobe até 50 usuários em 1 minuto
        { duration: '2m', target: 50 }, // Mantém por 2 minutos
        { duration: '30s', target: 0 }, // Desce gradualmente
      ],
    },
    endurance_test: {
      executor: 'constant-vus',
      vus: 20,
      duration: '10m', // Mantém carga constante por 10 minutos
    },
    spike_test: {
      executor: 'ramping-arrival-rate',
      startRate: 5,
      timeUnit: '1s',
      stages: [
        { duration: '30s', target: 100 }, // Sobe rapidamente para 100 requisições/s
        { duration: '1m', target: 100 },
        { duration: '30s', target: 5 }, // Reduz abruptamente
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser abaixo de 500ms
    http_req_failed: ['rate<0.01'], // Menos de 1% de falhas
  },
};

// Função principal que será executada por cada VU
export default function () {
  const BASE_URL = 'https://sua-api.com'; // Defina a URL da aplicação

  // Teste de GET no endpoint principal
  const res = http.get(`${BASE_URL}/endpoint`);

  // Validações
  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
  });

  // Teste de POST com payload
  const payload = JSON.stringify({ key: 'valor' });
  const headers = { 'Content-Type': 'application/json' };

  const postRes = http.post(`${BASE_URL}/api/create`, payload, { headers });
  check(postRes, {
    'POST retornou 201': (r) => r.status === 201,
  });

  // Teste de autenticação
  const authRes = http.post(`${BASE_URL}/login`, JSON.stringify({ username: 'user', password: 'pass' }), { headers });
  check(authRes, {
    'Login retornou token': (r) => r.json('token') !== '',
  });

  // Pausa entre requisições
  sleep(1);
}

// Exemplo de execução:
// k6 run script.js
