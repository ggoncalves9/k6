# Passo a Passo: Projeto de Testes de Carga, Stress e Desempenho com K6

## 🎯 Objetivo
O projeto valida a performance da aplicação após a migração para o EKS, testando carga, stress e desempenho dos endpoints principais.

---

## 📁 1. Estrutura do Projeto

- **/k6_carga_test.js** → Teste de carga progressiva.
- **/k6_stress_test.js** → Teste de stress com picos e quedas.
- **/k6_performance_test.js** → Teste de desempenho com foco em resposta.
- **/k6_project_step_by_step.md** → Este guia.

---

## 🛠️ 2. Instalação do K6

1. **Linux/Mac:**
    ```bash
    brew install k6
    ```

2. **Windows (via Chocolatey):**
    ```bash
    choco install k6
    ```

3. **Docker:**
    ```bash
    docker pull grafana/k6
    ```

---

## 🔥 3. Configuração dos Testes

Cada arquivo JS possui a estrutura:
- **Stages**: Define a duração e o número de VUs (virtual users).
- **Base URL**: Endpoint da API.
- **Check**: Valida status e tempo de resposta.
- **Sleep**: Pausa entre requisições.

---

## 🚀 4. Execução dos Testes

Execute cada teste individualmente:

- **Teste de Carga:**
    ```bash
    k6 run k6_carga_test.js
    ```

- **Teste de Stress:**
    ```bash
    k6 run k6_stress_test.js
    ```

- **Teste de Desempenho:**
    ```bash
    k6 run k6_performance_test.js
    ```

Ou, se estiver usando Docker:

```bash
docker run -i grafana/k6 run - < k6_carga_test.js
```

---

## 📊 5. Análise dos Resultados

Os resultados serão exibidos no terminal com:
- **Req/s (requisições por segundo)**
- **Tempo de resposta médio e p(95)**
- **% de falhas**

👉 **Exemplo de saída:**
```bash
checks.....................: 100.00% ✓ 3000 ✗ 0
http_req_duration..........: avg=250ms p(95)=450ms
http_req_failed............: rate=0.01% ✓ 2999 ✗ 1
```

---

## 📌 6. Melhorias Futuras

- **Integração com Grafana e Prometheus** para monitoramento contínuo.
- **Automatização via CI/CD** (GitHub Actions ou Jenkins).
- **Validação de payloads e autenticação avançada.**

---

Agora é só apresentar! 🚀🔥

