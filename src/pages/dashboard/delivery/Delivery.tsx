import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Package,
  LogOut,
  Filter,
  FileText,
  Star,
  ExternalLink,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

interface EntregaDisponivel {
  id: string
  empresa: string
  descricao: string
  enderecoRetirada: string
  enderecoEntrega: string
  urgencia: "baixa" | "media" | "alta"
  valor: number
  dataHora: string
  distancia: string
}

interface MinhaEntrega {
  id: string
  empresa: string
  descricao: string
  enderecoRetirada: string
  enderecoEntrega: string
  status: "aceita" | "coletada" | "entregue"
  valor: number
  dataHora: string
  notaEntrega?: string
}

export default function Delivery() {
  const [entregasDisponiveis, setEntregasDisponiveis] = useState<EntregaDisponivel[]>([
    {
      id: "1",
      empresa: "Tech Solutions Ltda",
      descricao: "Entrega de documentos urgentes",
      enderecoRetirada: "Av. Paulista, 1000 - Bela Vista",
      enderecoEntrega: "Rua Augusta, 500 - Consolação",
      urgencia: "alta",
      valor: 35.0,
      dataHora: "2024-01-15 15:00",
      distancia: "2.5 km",
    },
    {
      id: "2",
      empresa: "Comercial ABC",
      descricao: "Entrega de produtos",
      enderecoRetirada: "Rua das Flores, 123 - Centro",
      enderecoEntrega: "Av. Brasil, 789 - Jardins",
      urgencia: "media",
      valor: 25.0,
      dataHora: "2024-01-15 16:30",
      distancia: "4.2 km",
    },
    {
      id: "3",
      empresa: "Startup XYZ",
      descricao: "Entrega de equipamentos",
      enderecoRetirada: "Rua Inovação, 456 - Vila Madalena",
      enderecoEntrega: "Rua Criativa, 321 - Pinheiros",
      urgencia: "baixa",
      valor: 20.0,
      dataHora: "2024-01-15 18:00",
      distancia: "3.8 km",
    },
  ])

  const [minhasEntregas, setMinhasEntregas] = useState<MinhaEntrega[]>([
    {
      id: "4",
      empresa: "Empresa Delta",
      descricao: "Entrega de documentos",
      enderecoRetirada: "Rua A, 123",
      enderecoEntrega: "Rua B, 456",
      status: "entregue",
      valor: 30.0,
      dataHora: "2024-01-15 10:00",
      notaEntrega: "NE-001",
    },
  ])

  const [filtroUrgencia, setFiltroUrgencia] = useState("todas")
  const [busca, setBusca] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se está logado como motoboy
    const userType = localStorage.getItem("userType")
    if (userType !== "motoboy") {
      navigate("/")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userEmail")
    navigate("/")
  }

  const aceitarEntrega = (entregaId: string) => {
    const entrega = entregasDisponiveis.find((e) => e.id === entregaId)
    if (entrega) {
      const novaEntrega: MinhaEntrega = {
        id: entrega.id,
        empresa: entrega.empresa,
        descricao: entrega.descricao,
        enderecoRetirada: entrega.enderecoRetirada,
        enderecoEntrega: entrega.enderecoEntrega,
        status: "aceita",
        valor: entrega.valor,
        dataHora: entrega.dataHora,
      }
      setMinhasEntregas([...minhasEntregas, novaEntrega])
      setEntregasDisponiveis(entregasDisponiveis.filter((e) => e.id !== entregaId))
    }
  }

  const atualizarStatusEntrega = (entregaId: string, novoStatus: "aceita" | "coletada" | "entregue") => {
    setMinhasEntregas(
      minhasEntregas.map((entrega) =>
        entrega.id === entregaId
          ? {
              ...entrega,
              status: novoStatus,
              notaEntrega: novoStatus === "entregue" ? `NE-${entregaId}` : entrega.notaEntrega,
            }
          : entrega,
      ),
    )
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aceita":
        return "bg-blue-100 text-blue-800"
      case "coletada":
        return "bg-yellow-100 text-yellow-800"
      case "entregue":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const entregasFiltradas = entregasDisponiveis.filter((entrega) => {
    const matchBusca =
      entrega.empresa.toLowerCase().includes(busca.toLowerCase()) ||
      entrega.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchUrgencia = filtroUrgencia === "todas" || entrega.urgencia === filtroUrgencia
    return matchBusca && matchUrgencia
  })

  const entregasAceitas = minhasEntregas.filter((e) => e.status === "aceita")
  const entregasColetadas = minhasEntregas.filter((e) => e.status === "coletada")
  const entregasEntregues = minhasEntregas.filter((e) => e.status === "entregue")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Dashboard Motoboy</h1>
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
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                  <p className="text-2xl font-bold text-gray-900">{entregasDisponiveis.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {entregasAceitas.length + entregasColetadas.length}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">{entregasEntregues.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganhos Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {entregasEntregues.reduce((total, entrega) => total + entrega.valor, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="disponiveis" className="space-y-4">
          <TabsList>
            <TabsTrigger value="disponiveis">Entregas Disponíveis ({entregasDisponiveis.length})</TabsTrigger>
            <TabsTrigger value="minhas">Minhas Entregas ({minhasEntregas.length})</TabsTrigger>
            <TabsTrigger value="historico">Histórico ({entregasEntregues.length})</TabsTrigger>
            <TabsTrigger value="avaliacoes">Minhas Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="disponiveis" className="space-y-4">
            {/* Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por empresa ou descrição..."
                        className="pl-10"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <Select value={filtroUrgencia} onValueChange={setFiltroUrgencia}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filtrar por urgência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de entregas disponíveis */}
            <div className="space-y-4">
              {entregasFiltradas.map((entrega) => (
                <Card key={entrega.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{entrega.empresa}</CardTitle>
                        <CardDescription>{entrega.descricao}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getUrgenciaColor(entrega.urgencia)}>{entrega.urgencia}</Badge>
                        <Badge variant="outline">{entrega.distancia}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-green-600">R$ {entrega.valor.toFixed(2)}</span>
                        <span className="text-sm text-gray-500">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {entrega.dataHora}
                        </span>
                      </div>
                      <Button onClick={() => aceitarEntrega(entrega.id)}>Aceitar Entrega</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="minhas" className="space-y-4">
            {minhasEntregas.map((entrega) => (
              <Card key={entrega.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{entrega.empresa}</CardTitle>
                      <CardDescription>{entrega.descricao}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(entrega.status)}>{entrega.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-green-600">R$ {entrega.valor.toFixed(2)}</span>
                      {entrega.notaEntrega && (
                        <span className="text-sm text-gray-500">Nota: {entrega.notaEntrega}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {entrega.status === "aceita" && (
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => atualizarStatusEntrega(entrega.id, "coletada")}>
                            Marcar como Coletada
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(entrega.enderecoRetirada)}`,
                                "_blank",
                              )
                            }
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Abrir no Maps
                          </Button>
                        </div>
                      )}
                      {entrega.status === "coletada" && (
                        <div className="flex gap-2">
                          <Button onClick={() => atualizarStatusEntrega(entrega.id, "entregue")}>
                            Marcar como Entregue
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(entrega.enderecoEntrega)}`,
                                "_blank",
                              )
                            }
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Abrir no Maps
                          </Button>
                        </div>
                      )}
                      {entrega.status === "entregue" && entrega.notaEntrega && (
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Nota
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Mensal</CardTitle>
                <CardDescription>Resumo das suas entregas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{entregasEntregues.length}</p>
                    <p className="text-sm text-gray-600">Entregas Realizadas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      R$ {entregasEntregues.reduce((total, entrega) => total + entrega.valor, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Total Ganho</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      R${" "}
                      {entregasEntregues.length > 0
                        ? (
                            entregasEntregues.reduce((total, entrega) => total + entrega.valor, 0) /
                            entregasEntregues.length
                          ).toFixed(2)
                        : "0.00"}
                    </p>
                    <p className="text-sm text-gray-600">Média por Entrega</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Relatório Mensal
                </Button>
              </CardContent>
            </Card>

            {/* Histórico detalhado */}
            <div className="space-y-4">
              {entregasEntregues.map((entrega) => (
                <Card key={entrega.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{entrega.empresa}</CardTitle>
                        <CardDescription>{entrega.descricao}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Concluída</Badge>
                    </div>
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
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-green-600">R$ {entrega.valor.toFixed(2)}</span>
                        <span className="text-sm text-gray-500">{entrega.dataHora}</span>
                        {entrega.notaEntrega && (
                          <span className="text-sm text-blue-600">Nota: {entrega.notaEntrega}</span>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="avaliacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Avaliações</CardTitle>
                <CardDescription>Veja como as empresas avaliaram seus serviços</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex justify-center items-center mb-2">
                      <Star className="h-8 w-8 text-yellow-400 fill-current" />
                      <span className="text-3xl font-bold text-gray-900 ml-2">4.8</span>
                    </div>
                    <p className="text-sm text-gray-600">Avaliação Média</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-gray-600">Total de Avaliações</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">98%</p>
                    <p className="text-sm text-gray-600">Recomendação</p>
                  </div>
                </div>

                {/* Distribuição de estrelas */}
                <div className="space-y-2 mb-6">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm w-8">{stars}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {stars === 5 ? 8 : stars === 4 ? 3 : stars === 3 ? 1 : stars === 2 ? 0 : 0}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Avaliações recentes */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Avaliações Recentes</h3>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Tech Solutions Ltda</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">15/01/2024</span>
                    </div>
                    <p className="text-sm text-gray-700">"Excelente serviço! Pontual e cuidadoso com os documentos."</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Comercial ABC</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">14/01/2024</span>
                    </div>
                    <p className="text-sm text-gray-700">"Muito bom! Entrega rápida e comunicação clara."</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
