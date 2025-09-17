
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Package, Clock, CheckCircle, Truck, LogOut, FileText, MapPin, Star } from "lucide-react"


import { useNavigate } from "react-router-dom"

interface Entrega {
  id: string
  descricao: string
  enderecoRetirada: string
  enderecoEntrega: string
  status: "pendente" | "em_andamento" | "concluida"
  urgencia: "baixa" | "media" | "alta"
  motoboy?: string
  dataHora: string
  valor?: number
}

export default function Company() {

  // const [entregas, setEntregas] = useState<Entrega[]>([
  //   {
  //     id: "1",
  //     descricao: "Entrega de documentos",
  //     enderecoRetirada: "Rua A, 123 - Centro",
  //     enderecoEntrega: "Rua B, 456 - Jardins",
  //     status: "em_andamento",
  //     urgencia: "alta",
  //     motoboy: "João Silva",
  //     dataHora: "2024-01-15 14:30",
  //     valor: 25.0,
  //   },
  //   {
  //     id: "2",
  //     descricao: "Entrega de produtos",
  //     enderecoRetirada: "Av. Principal, 789",
  //     enderecoEntrega: "Rua C, 321 - Vila Nova",
  //     status: "concluida",
  //     urgencia: "media",
  //     motoboy: "Maria Santos",
  //     dataHora: "2024-01-15 10:00",
  //     valor: 35.0,
  //   },
  // ])

  const entregas =[
    {
      id: "1",
      descricao: "Entrega de documentos",
      enderecoRetirada: "Rua A, 123 - Centro",
      enderecoEntrega: "Rua B, 456 - Jardins",
      status: "em_andamento",
      urgencia: "alta",
      motoboy: "João Silva",
      dataHora: "2024-01-15 14:30",
      valor: 25.0,
    },
    {
      id: "2",
      descricao: "Entrega de produtos",
      enderecoRetirada: "Av. Principal, 789",
      enderecoEntrega: "Rua C, 321 - Vila Nova",
      status: "concluida",
      urgencia: "media",
      motoboy: "Maria Santos",
      dataHora: "2024-01-15 10:00",
      valor: 35.0,
    },
  ] as Entrega[]

  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se está logado como empresa
    const userType = localStorage.getItem("userType")
    if (userType !== "empresa") {
      navigate("/")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    navigate("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "em_andamento":
        return "bg-blue-100 text-blue-800"
      case "concluida":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "baixa":
        return "bg-green-100 text-green-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "alta":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const entregasPendentes = entregas.filter((e) => e.status === "pendente")
  const entregasAndamento = entregas.filter((e) => e.status === "em_andamento")
  const entregasConcluidas = entregas.filter((e) => e.status === "concluida")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Dashboard Empresa</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{entregasPendentes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900">{entregasAndamento.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Concluídas</p>
                  <p className="text-2xl font-bold text-gray-900">{entregasConcluidas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{entregas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="/dashboard/company/new-order">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Criar Novo Pedido
            </Button>
          </a>
          <a href="/dashboard/company/schedule">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Entrega
            </Button>
          </a>
        </div>

        {/* Tabs de entregas */}
        <Tabs defaultValue="todas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todas">Todas as Entregas</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes ({entregasPendentes.length})</TabsTrigger>
            <TabsTrigger value="andamento">Em Andamento ({entregasAndamento.length})</TabsTrigger>
            <TabsTrigger value="concluidas">Concluídas ({entregasConcluidas.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="todas" className="space-y-4">
            {entregas.map((entrega) => (
              <Card key={entrega.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{entrega.descricao}</CardTitle>
                      <CardDescription>Pedido #{entrega.id}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(entrega.status)}>{entrega.status.replace("_", " ")}</Badge>
                      <Badge className={getUrgenciaColor(entrega.urgencia)}>{entrega.urgencia}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Retirada:</p>
                      <p className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-green-600" />
                        {entrega.enderecoRetirada}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Entrega:</p>
                      <p className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-red-600" />
                        {entrega.enderecoEntrega}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {entrega.motoboy && (
                        <span>
                          Motoboy: <strong>{entrega.motoboy}</strong>
                        </span>
                      )}
                      {entrega.valor && (
                        <span className="ml-4">
                          Valor: <strong>R$ {entrega.valor.toFixed(2)}</strong>
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{entrega.dataHora}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pendentes" className="space-y-4">
            {entregasPendentes.map((entrega) => (
              <Card key={entrega.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{entrega.descricao}</CardTitle>
                  <CardDescription>Aguardando motoboy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Retirada:</p>
                      <p className="text-sm">{entrega.enderecoRetirada}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Entrega:</p>
                      <p className="text-sm">{entrega.enderecoEntrega}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="andamento" className="space-y-4">
            {entregasAndamento.map((entrega) => (
              <Card key={entrega.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{entrega.descricao}</CardTitle>
                  <CardDescription>Motoboy: {entrega.motoboy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Retirada:</p>
                      <p className="text-sm">{entrega.enderecoRetirada}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Entrega:</p>
                      <p className="text-sm">{entrega.enderecoEntrega}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="concluidas" className="space-y-4">
            {entregasConcluidas.map((entrega) => (
              <Card key={entrega.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{entrega.descricao}</CardTitle>
                  <CardDescription>Concluída por: {entrega.motoboy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Retirada:</p>
                      <p className="text-sm">{entrega.enderecoRetirada}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Entrega:</p>
                      <p className="text-sm">{entrega.enderecoEntrega}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Valor: <strong>R$ {entrega.valor?.toFixed(2)}</strong>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Nota
                      </Button>
                      <a href={`/dashboard/company/evaluate/${entrega.id}`}>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          <Star className="h-4 w-4 mr-2" />
                          Avaliar Motoboy
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
