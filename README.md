# TaskDB-Azure-CI-CD-PassportJS

A task to manage social logins with passportjs and run on azure aks with azure postgresql for the database

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment to AKS](#deployment-to-aks)
- [ToDo](#todo)
- [Appreciation](#appreciation)
- [License](#license)

## Prerequisites

- Node.js (Ideally 16 or higher)
- Docker
- Kubernetes CLI (kubectl) (optional)
- Azure CLI (az) (optional)
- Access to an Azure Kubernetes Service (AKS) cluster

## Installation

1. Download Zip or Clone the repository: `git clone https://github.com/ConfidenceDev/TaskDB-Azure-CI-CD-PassportJS.git`
2. Install dependencies: `npm install`

## Configuration

<b>Locally:</b>

1. Update the config file in configs/config.js with you own env variables.
2. Or use a .env file for your env variables.

<b>Azure Cloud with AKS and Key Vault:</b>

1. Azure SQL Setup:

   - You can use any sql of choice, but postgres is used for this project.
   - Search and create a new database from the dashboard, choose a name, select a region and resource group(Or create one if none exists), choose a username and password, then review and create.
   - Click on Connection & Security and Add your IP Address.

2. Azure Kubernets Services (AKS) Setup:

   - Search for Kubernetes services, create a new cluster, choose your resource group, closest region and choose a name, then review and create.

3. Azure Key Vault Setup:

   - Find the Key Vault service from the dashboard and create a new vault, choose a name, select a region and resource group then review and create.
   - Select secrets under objects in the menu and add all your environment variables.
   - Select Access polices, create a new access policy, under permissions, check all secret permissions, under principal, search and choose you AAD and AKS name, then review and create.

4. NOTE: Use the same resource group and region for all services, and do update all approprate parameters in your workflow for automation to work.

<b>Github Actions Workflow:</b>

Workflow is required to automate builds and deployment and fetching azure key vault secrets.

1. Head over to your repo settings and save six secrets
   a. AZURE_CREDENTIALS: Get details from Azure Active Directory (AAD) App Registration setup

```
    {
        "clientId": "<Application(Client) ID from App Registration>",
        "clientSecret": "<Certificate secret value from App Registration>",
        "subscriptionId": "<General Account Subscription Id>",
        "tenantId": "<Tenant Id from App Registration>",
        "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
        "resourceManagerEndpointUrl": "https://management.azure.com/",
        "activeDirectoryGraphResourceId": "https://graph.windows.net/",
        "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
        "galleryEndpointUrl": "https://gallery.azure.com/",
        "managementEndpointUrl": "https://management.core.windows.net/"
    }
```

    b. CLUSTER_NAME: Azure kubernetes cluster name

    c. RESOURCE_GROUP: Azure resource group name used

    d. DOCKER_USERNAME

    e. DOCKER_PASSWORD

    f. VAULT: Your key vault name

2. Automation should start automatically, but you can go to Actions tab to kick start manually build as well.

## Running the Application

<b>Locally:</b>

1. Start the application server: `npm run start` or `npm run dev`
2. Open a web browser and navigate to `http://localhost:5000`.

<b>From AKS Cluster:</b>

1. Head over to your azure dashboard, kubernetes services, select your cluster.
2. Select services and ingres, then find the external ip address of your service and load.

## Deployment to AKS

Explain how to deploy the application to an Azure Kubernetes Service (AKS) cluster. For example:

1. Log in to Azure CLI: `az login`
2. Set the subscription: `az account set --subscription <subscription_id>`
3. Create a resource group for AKS: `az group create --name myResourceGroup --location eastus`
4. Create the AKS cluster: `az aks create --resource-group myResourceGroup --name myAKSCluster --node-count 3 --generate-ssh-keys`
5. Get the AKS credentials: `az aks get-credentials --resource-group myResourceGroup --name myAKSCluster`
6. Verify the cluster connection: `kubectl get nodes`
7. Deploy the application: `kubectl apply -f deployment.yaml`

## ToDo

1. Write unit tests
2. Use Storage Driver CSI in deployment rather than using Github workflow to retrieve Key Vault Secrets.
3. And more endpoints.

## Appreciation

Thanks to SaasDen for providing this task.

## License

MIT License

Copyright (c) 2023 ConfidenceDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
