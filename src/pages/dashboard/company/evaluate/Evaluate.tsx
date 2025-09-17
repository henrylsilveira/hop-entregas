
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Star, User } from "lucide-react"

import { useNavigate, useParams } from "react-router-dom"

export default function Evaluate() {
  const [avaliacao, setAvaliacao] = useState(0)
  const [comentario, setComentario] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  const params = useParams()

  // Dados simulados da entrega
  const entrega = {
    id: params.id,
    motoboy: "João Silva",
    descricao: "Entrega de documentos",
    dataHora: "2024-01-15 10:00",
    valor: 35.0,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (avaliacao === 0) {
      alert("Por favor, selecione uma avaliação")
      setLoading(false)
      return
    }

    // Simulação de envio da avaliação
    setTimeout(() => {
      setSuccess("Avaliação enviada com sucesso! Redirecionando...")
      setTimeout(() => {
        navigate("/dashboard/company")
      }, 2000)
      setLoading(false)
    }, 1000)
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setAvaliacao(index + 1)}
        className={`text-3xl transition-colors ${
          index < avaliacao ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
        }`}
      >
        <Star className={`h-8 w-8 ${index < avaliacao ? "fill-current" : ""}`} />
      </button>
    ))
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
          <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Avaliar Motoboy</h1>
          <p className="text-gray-600">Como foi o serviço prestado?</p>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Entrega</CardTitle>
            <CardDescription>Entrega #{entrega.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Motoboy:</p>
                  <p className="font-medium">{entrega.motoboy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data/Hora:</p>
                  <p className="font-medium">{entrega.dataHora}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Descrição:</p>
                  <p className="font-medium">{entrega.descricao}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valor:</p>
                  <p className="font-medium">R$ {entrega.valor.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-lg">Avaliação do Serviço</Label>
                <div className="flex justify-center space-x-2">{renderStars()}</div>
                <div className="text-center text-sm text-gray-600">
                  {avaliacao > 0 && (
                    <span>
                      {avaliacao === 1 && "Muito Ruim"}
                      {avaliacao === 2 && "Ruim"}
                      {avaliacao === 3 && "Regular"}
                      {avaliacao === 4 && "Bom"}
                      {avaliacao === 5 && "Excelente"}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentario">Comentário (opcional)</Label>
                <Textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Deixe um comentário sobre o serviço prestado..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Enviando Avaliação..." : "Enviar Avaliação"}
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
