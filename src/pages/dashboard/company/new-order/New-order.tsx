import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, MapPin, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function NewOrder() {
  const [formData, setFormData] = useState({
    descricao: "",
    enderecoRetirada: "",
    enderecoEntrega: "",
    urgencia: "",
    observacoes: "",
    valor: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validação
    if (!formData.descricao || !formData.enderecoRetirada || !formData.enderecoEntrega || !formData.urgencia) {
      alert("Por favor, preencha todos os campos obrigatórios")
      setLoading(false)
      return
    }

    // Simulação de criação do pedido
    setTimeout(() => {
      setSuccess("Pedido criado com sucesso! Redirecionando...")
      setTimeout(() => {
       navigate("/dashboard/company")
      }, 2000)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <a href="/dashboard/company" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao Dashboard
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Criar Novo Pedido</h1>
          <p className="text-gray-600">Preencha os detalhes da entrega</p>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Entrega</CardTitle>
            <CardDescription>Informe todos os dados necessários para a entrega</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição da Entrega *</Label>
                <Input
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Ex: Entrega de documentos, produtos, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="enderecoRetirada">Endereço de Retirada *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                    <Input
                      id="enderecoRetirada"
                      className="pl-10"
                      value={formData.enderecoRetirada}
                      onChange={(e) => setFormData({ ...formData, enderecoRetirada: e.target.value })}
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 bg-transparent"
                    onClick={() => window.open("https://www.google.com/maps", "_blank")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Selecionar no Mapa
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="enderecoEntrega">Endereço de Entrega *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-600" />
                    <Input
                      id="enderecoEntrega"
                      className="pl-10"
                      value={formData.enderecoEntrega}
                      onChange={(e) => setFormData({ ...formData, enderecoEntrega: e.target.value })}
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 bg-transparent"
                    onClick={() => window.open("https://www.google.com/maps", "_blank")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Selecionar no Mapa
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urgencia">Urgência *</Label>
                  <Select
                    value={formData.urgencia}
                    onValueChange={(value) => setFormData({ ...formData, urgencia: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa - Até 24h</SelectItem>
                      <SelectItem value="media">Média - Até 4h</SelectItem>
                      <SelectItem value="alta">Alta - Até 2h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor da Entrega (R$)</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações adicionais sobre a entrega..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Criando Pedido..." : "Criar Pedido"}
                </Button>
                <a href="/dashboard/company">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
