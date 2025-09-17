import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function Schedule() {
  const [formData, setFormData] = useState({
    data: "",
    horario: "",
    endereco: "",
    quantidadeMotoboys: "",
    descricaoServico: "",
    observacoes: "",
    valorPorMotoboy: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validação
    if (
      !formData.data ||
      !formData.horario ||
      !formData.endereco ||
      !formData.quantidadeMotoboys ||
      !formData.descricaoServico
    ) {
      alert("Por favor, preencha todos os campos obrigatórios")
      setLoading(false)
      return
    }

    // Simulação de agendamento
    setTimeout(() => {
      setSuccess("Entrega agendada com sucesso! Redirecionando...")
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
          <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Agendar Entrega</h1>
          <p className="text-gray-600">Programe um serviço para data futura</p>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Agendamento</CardTitle>
            <CardDescription>Informe os dados para agendar o serviço de entrega</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data do Serviço *</Label>
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario">Horário *</Label>
                  <Input
                    id="horario"
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço do Serviço *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
                  <Input
                    id="endereco"
                    className="pl-10"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    placeholder="Rua, número, bairro, cidade, CEP"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantidadeMotoboys">Quantidade de Motoboys *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
                    <Select
                      value={formData.quantidadeMotoboys}
                      onValueChange={(value) => setFormData({ ...formData, quantidadeMotoboys: value })}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Selecione a quantidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Motoboy</SelectItem>
                        <SelectItem value="2">2 Motoboys</SelectItem>
                        <SelectItem value="3">3 Motoboys</SelectItem>
                        <SelectItem value="4">4 Motoboys</SelectItem>
                        <SelectItem value="5">5 ou mais Motoboys</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorPorMotoboy">Valor por Motoboy (R$)</Label>
                  <Input
                    id="valorPorMotoboy"
                    type="number"
                    step="0.01"
                    value={formData.valorPorMotoboy}
                    onChange={(e) => setFormData({ ...formData, valorPorMotoboy: e.target.value })}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricaoServico">Descrição do Serviço *</Label>
                <Textarea
                  id="descricaoServico"
                  value={formData.descricaoServico}
                  onChange={(e) => setFormData({ ...formData, descricaoServico: e.target.value })}
                  placeholder="Descreva detalhadamente o tipo de serviço que será realizado..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Adicionais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações extras, requisitos especiais, etc..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Resumo do Agendamento</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  {formData.data && <p>Data: {new Date(formData.data).toLocaleDateString("pt-BR")}</p>}
                  {formData.horario && <p>Horário: {formData.horario}</p>}
                  {formData.quantidadeMotoboys && <p>Motoboys: {formData.quantidadeMotoboys}</p>}
                  {formData.valorPorMotoboy && formData.quantidadeMotoboys && (
                    <p>
                      Valor Total: R${" "}
                      {(
                        Number.parseFloat(formData.valorPorMotoboy) * Number.parseInt(formData.quantidadeMotoboys)
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Agendando..." : "Confirmar Agendamento"}
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
